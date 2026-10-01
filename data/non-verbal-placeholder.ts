import type { QuizQuestion } from "@/lib/quiz-types";

const NON_VERBAL_PLACEHOLDER_COUNT = 64;
const OPTION_LABELS = ["A", "B", "C", "D"] as const;

export const DEVELOPMENT_NON_VERBAL_QUESTIONS: readonly QuizQuestion[] = Array.from(
  { length: NON_VERBAL_PLACEHOLDER_COUNT },
  (_, questionIndex) => {
    const questionId = `development/non-verbal/${questionIndex + 1}`;

    return {
      id: questionId,
      question: `Development placeholder ${questionIndex + 1}. Real Non-Verbal question data has not been supplied.`,
      type: "image",
      options: OPTION_LABELS.map((label, optionIndex) => ({
        id: `${questionId}:option-${optionIndex + 1}`,
        label,
        type: "image" as const,
      })),
    };
  },
);