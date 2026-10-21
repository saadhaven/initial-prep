import * as academicPrimary from "@/data/academic";
import * as academicAdditional from "@/data/academic-2";
import * as english from "@/data/english";
import { experienceQuestions } from "@/data/experience";
import * as pakStudy from "@/data/pak-study";
import * as verbal from "@/data/verbal";
import type { TestTypeId } from "@/config/test-types";
import type { QuizImage } from "@/lib/quiz-types";

type SourceOption = string | { text?: string; image?: QuizImage };
const QUESTION_OPTION_COUNT = 4;

export type SourceQuestion = {
  type?: "text" | "image";
  question: string;
  image?: QuizImage;
  options: readonly [SourceOption, SourceOption, SourceOption, SourceOption];
  correctAnswer: string;
  reason?: string;
};

export type QuestionSourceRecord = {
  sourceBankId: string;
  sourceIndex: number;
  question: SourceQuestion;
};

type SourceBank = {
  id: string;
  questions: readonly QuestionSourceRecord[];
};

function isSourceQuestion(value: unknown): value is SourceQuestion {
  if (typeof value !== "object" || value === null) return false;

  const row = value as Record<string, unknown>;
  const isImage = (image: unknown) => {
    if (typeof image !== "object" || image === null) return false;
    const media = image as Record<string, unknown>;
    return typeof media.src === "string" && typeof media.alt === "string";
  };
  const isOption = (option: unknown) => {
    if (typeof option === "string") return true;
    if (typeof option !== "object" || option === null) return false;
    const choice = option as Record<string, unknown>;
    return (
      (choice.text === undefined || typeof choice.text === "string") &&
      (choice.image === undefined || isImage(choice.image)) &&
      (typeof choice.text === "string" || choice.image !== undefined)
    );
  };
  const options = row.options;

  return (
    typeof row.question === "string" &&
    typeof row.correctAnswer === "string" &&
    (row.type === undefined || row.type === "text" || row.type === "image") &&
    (row.image === undefined || isImage(row.image)) &&
    (row.reason === undefined || typeof row.reason === "string") &&
    Array.isArray(options) &&
    options.length === QUESTION_OPTION_COUNT &&
    options.every(isOption)
  );
}

function readSourceBanks(prefix: string, source: object): SourceBank[] {
  const banks: SourceBank[] = [];

  for (const [bankName, value] of Object.entries(source as Record<string, unknown>)) {
    if (!Array.isArray(value)) continue;

    const id = `${prefix}/${bankName}`;
    const questions: QuestionSourceRecord[] = [];
    for (const [sourceIndex, question] of (value as unknown[]).entries()) {
      if (!isSourceQuestion(question)) continue;
      questions.push({ sourceBankId: id, sourceIndex, question });
    }

    banks.push({ id, questions });
  }

  return banks;
}

function flattenBanks(banks: readonly SourceBank[]): QuestionSourceRecord[] {
  return banks.flatMap((bank) => bank.questions);
}

const verbalBanks = readSourceBanks("verbal", verbal);
const academicBanks = [
  ...readSourceBanks("academic", academicPrimary),
  ...readSourceBanks("academic-2", academicAdditional),
  ...readSourceBanks("english", english),
  ...readSourceBanks("pak-study", pakStudy),
];
const experienceBank: QuestionSourceRecord[] = experienceQuestions.map((question, sourceIndex) => ({
  sourceBankId: "experience/verbal",
  sourceIndex,
  question,
}));

export const QUESTION_BANKS = {
  verbal: flattenBanks(verbalBanks),
  "non-verbal": [],
  academic: flattenBanks(academicBanks),
  experience: experienceBank,
} satisfies Record<TestTypeId, readonly QuestionSourceRecord[]>;