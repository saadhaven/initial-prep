"use client";

import { useSyncExternalStore } from "react";
import type { TestTypeId } from "@/config/test-types";
import { isQuizAttempt, quizAttemptStorageKey, type QuizAttempt } from "@/lib/quiz-results";

type SavedAttemptState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "ready"; attempt: QuizAttempt };

function subscribeToSessionStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readSessionStorage(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return undefined;
}

export function useSavedAttempt(testType: TestTypeId, moduleId: string): SavedAttemptState {
  const storageKey = quizAttemptStorageKey(testType, moduleId);
  const savedAttemptData = useSyncExternalStore(
    subscribeToSessionStorage,
    () => readSessionStorage(storageKey),
    getServerSnapshot,
  );

  if (savedAttemptData === undefined) return { status: "loading" };
  if (savedAttemptData === null) return { status: "empty" };

  try {
    const parsed: unknown = JSON.parse(savedAttemptData);
    if (isQuizAttempt(parsed, testType, moduleId)) return { status: "ready", attempt: parsed };
  } catch {
    return { status: "empty" };
  }

  return { status: "empty" };
}