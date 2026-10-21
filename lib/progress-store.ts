import type { TestTypeId } from "@/config/test-types";
import type { QuizAttempt } from "@/lib/quiz-results";
import { calculateQuizResult } from "@/lib/quiz-results";
import type { QuizQuestion } from "@/lib/quiz-types";

export type AttemptSummary = {
  id: string;
  testType: TestTypeId;
  moduleId: string;
  completedAt: number;
  total: number;
  attempted: number;
  correct: number;
  wrong: number;
  unanswered: number;
  scorePercentage: number;
  timeUsedSeconds: number;
  timeRemainingSeconds: number;
};

export type ProgressStore = {
  version: 1;
  attempts: readonly AttemptSummary[];
};

const PROGRESS_STORAGE_KEY = "pma-prep:progress:v1";
const EMPTY_PROGRESS_SNAPSHOT = JSON.stringify({ version: 1, attempts: [] });
const progressListeners = new Set<() => void>();

function isAttemptSummary(value: unknown): value is AttemptSummary {
  if (typeof value !== "object" || value === null) return false;
  const summary = value as Record<string, unknown>;
  const numberFields = ["completedAt", "total", "attempted", "correct", "wrong", "unanswered", "scorePercentage", "timeUsedSeconds", "timeRemainingSeconds"];

  return (
    typeof summary.id === "string" &&
    (summary.testType === "verbal" || summary.testType === "non-verbal" || summary.testType === "academic" || summary.testType === "experience") &&
    typeof summary.moduleId === "string" &&
    numberFields.every((field) => typeof summary[field] === "number" && Number.isFinite(summary[field]))
  );
}

export function parseProgressStore(rawValue: string | null): ProgressStore {
  if (!rawValue) return { version: 1, attempts: [] };

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (typeof parsed !== "object" || parsed === null) return { version: 1, attempts: [] };
    const candidate = parsed as Record<string, unknown>;
    if (candidate.version !== 1 || !Array.isArray(candidate.attempts)) return { version: 1, attempts: [] };
    return { version: 1, attempts: candidate.attempts.filter(isAttemptSummary) };
  } catch {
    return { version: 1, attempts: [] };
  }
}

export function getProgressSnapshot() {
  try {
    return window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? EMPTY_PROGRESS_SNAPSHOT;
  } catch {
    return EMPTY_PROGRESS_SNAPSHOT;
  }
}

export function subscribeToProgress(onChange: () => void) {
  progressListeners.add(onChange);
  function handleStorage(event: StorageEvent) {
    if (event.key === PROGRESS_STORAGE_KEY || event.key === null) onChange();
  }
  window.addEventListener("storage", handleStorage);

  return () => {
    progressListeners.delete(onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function saveCompletedAttempt(questions: readonly QuizQuestion[], attempt: QuizAttempt) {
  const result = calculateQuizResult(questions, attempt);
  if (!result.isScored || result.scorePercentage === null) return false;

  const summary: AttemptSummary = {
    id: `${attempt.testType}:${attempt.moduleId}:${attempt.completedAt}`,
    testType: attempt.testType,
    moduleId: attempt.moduleId,
    completedAt: attempt.completedAt,
    total: result.total,
    attempted: result.attempted,
    correct: result.correct,
    wrong: result.wrong,
    unanswered: result.unanswered,
    scorePercentage: result.scorePercentage,
    timeUsedSeconds: result.timeUsedSeconds,
    timeRemainingSeconds: result.timeRemainingSeconds,
  };
  const progress = parseProgressStore(getProgressSnapshot());
  const attempts = [summary, ...progress.attempts.filter((saved) => saved.id !== summary.id)].slice(0, 250);

  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ version: 1, attempts } satisfies ProgressStore));
    progressListeners.forEach((listener) => listener());
    return true;
  } catch {
    return false;
  }
}