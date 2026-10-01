import type { QuestionSourceRecord, SourceQuestion } from "@/lib/question-banks";
import type { QuizOption, QuizQuestion } from "@/lib/quiz-types";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

function createQuestionId(record: QuestionSourceRecord) {
  return `${record.sourceBankId}:${String(record.sourceIndex + 1).padStart(3, "0")}`;
}

function normalizeOption(questionId: string, option: SourceQuestion["options"][number], optionIndex: number): QuizOption {
  const label = OPTION_LABELS[optionIndex];
  const id = `${questionId}:option-${optionIndex + 1}`;

  if (typeof option === "string") {
    return { id, label, type: "text", text: option };
  }

  return {
    id,
    label,
    type: option.image ? "image" : "text",
    text: option.text,
    image: option.image,
  };
}

export function normalizeQuestion(record: QuestionSourceRecord): QuizQuestion | null {
  const questionId = createQuestionId(record);
  const source = record.question;
  const options = source.options.map((option, optionIndex) => normalizeOption(questionId, option, optionIndex));
  const correctOption =
    options.find((option) => option.text === source.correctAnswer) ??
    options.find((option) => option.label === source.correctAnswer);

  if (!correctOption) return null;

  const hasImage = Boolean(source.image) || options.some((option) => option.type === "image");

  return {
    id: questionId,
    question: source.question,
    type: source.type ?? (hasImage ? "image" : "text"),
    image: source.image,
    options,
    correctAnswer: source.correctAnswer,
    correctOptionId: correctOption.id,
    explanation: source.reason,
  };
}

export function normalizeQuestions(records: readonly QuestionSourceRecord[]): QuizQuestion[] {
  return records.flatMap((record) => {
    const question = normalizeQuestion(record);
    return question ? [question] : [];
  });
}