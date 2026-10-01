import type { TestTypeId } from "@/config/test-types";
import type { QuizQuestion } from "@/lib/quiz-types";

export type QuizAttempt = {
  version: 1;
  testType: TestTypeId;
  moduleId: string;
  startedAt: number;
  completedAt: number;
  durationSeconds: number;
  timeRemainingSeconds: number;
  answers: Readonly<Record<string, string>>;
};

export type QuestionOutcome = {
  question: QuizQuestion;
  selectedOptionId: string | null;
  selectedAnswer: string | null;
  correct: boolean;
};

export type QuizResult = {
  total: number;
  isScored: boolean;
  attempted: number;
  correct: number;
  wrong: number;
  unanswered: number;
  scorePercentage: number | null;
  timeUsedSeconds: number;
  timeRemainingSeconds: number;
  outcomes: readonly QuestionOutcome[];
};

export function quizAttemptStorageKey(testType: TestTypeId, moduleId: string) {
  return `pma-quiz:${testType}:${moduleId}:attempt`;
}

export function isQuizAttempt(value: unknown, testType: TestTypeId, moduleId: string): value is QuizAttempt {
  if (typeof value !== "object" || value === null) return false;

  const attempt = value as Record<string, unknown>;
  const answers = attempt.answers;
  const validAnswers =
    typeof answers === "object" &&
    answers !== null &&
    Object.values(answers).every((answer) => typeof answer === "string");

  return (
    attempt.version === 1 &&
    attempt.testType === testType &&
    attempt.moduleId === moduleId &&
    typeof attempt.startedAt === "number" &&
    Number.isFinite(attempt.startedAt) &&
    typeof attempt.completedAt === "number" &&
    Number.isFinite(attempt.completedAt) &&
    typeof attempt.durationSeconds === "number" &&
    Number.isFinite(attempt.durationSeconds) &&
    typeof attempt.timeRemainingSeconds === "number" &&
    Number.isFinite(attempt.timeRemainingSeconds) &&
    validAnswers
  );
}

export function calculateQuizResult(questions: readonly QuizQuestion[], attempt: QuizAttempt): QuizResult {
  const outcomes = questions.map((question) => {
    const savedOptionId = attempt.answers[question.id];
    const selectedOption = question.options.find((option) => option.id === savedOptionId);

    return {
      question,
      selectedOptionId: selectedOption?.id ?? null,
      selectedAnswer: selectedOption?.text ?? (selectedOption ? `Option ${selectedOption.label}` : null),
      correct: selectedOption?.id === question.correctOptionId,
    };
  });
  const total = questions.length;
  const isScored = total > 0 && questions.every((question) => question.correctOptionId !== undefined);
  const correct = isScored ? outcomes.filter((outcome) => outcome.correct).length : 0;
  const attempted = outcomes.filter((outcome) => outcome.selectedOptionId !== null).length;
  const unanswered = total - attempted;
  const wrong = isScored ? attempted - correct : 0;
  const timeRemainingSeconds = Math.min(attempt.durationSeconds, Math.max(0, attempt.timeRemainingSeconds));

  return {
    total,
    isScored,
    attempted,
    correct,
    wrong,
    unanswered,
    scorePercentage: isScored ? (correct / total) * 100 : null,
    timeUsedSeconds: attempt.durationSeconds - timeRemainingSeconds,
    timeRemainingSeconds,
    outcomes,
  };
}