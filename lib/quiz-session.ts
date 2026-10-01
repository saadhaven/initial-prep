import type { TestTypeId } from "@/config/test-types";

export type QuizAnswers = Readonly<Record<string, string>>;

const answerListeners = new Map<string, Set<() => void>>();

export function quizTimerStorageKey(testType: TestTypeId, moduleId: string) {
  return `pma-quiz:${testType}:${moduleId}:deadline`;
}

export function quizAnswersStorageKey(testType: TestTypeId, moduleId: string) {
  return `pma-quiz:${testType}:${moduleId}:answers`;
}

export function getQuizAnswersSnapshot(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function parseQuizAnswers(value: string | null): QuizAnswers {
  if (!value) return {};

  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  } catch {
    return {};
  }
}

export function subscribeToQuizAnswers(key: string, onChange: () => void) {
  const listeners = answerListeners.get(key) ?? new Set<() => void>();
  listeners.add(onChange);
  answerListeners.set(key, listeners);

  function handleStorage(event: StorageEvent) {
    if (event.key === key || event.key === null) onChange();
  }

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) answerListeners.delete(key);
    window.removeEventListener("storage", handleStorage);
  };
}

export function writeQuizAnswers(key: string, answers: QuizAnswers) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(answers));
  } catch {
    return;
  }

  answerListeners.get(key)?.forEach((listener) => listener());
}

export function clearQuizSession(testType: TestTypeId, moduleId: string) {
  try {
    window.sessionStorage.removeItem(quizTimerStorageKey(testType, moduleId));
    window.sessionStorage.removeItem(quizAnswersStorageKey(testType, moduleId));
  } catch {
    return;
  }

  answerListeners.get(quizAnswersStorageKey(testType, moduleId))?.forEach((listener) => listener());
}