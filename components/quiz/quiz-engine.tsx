"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { QuizOption } from "@/lib/quiz-types";
import type { QuizModule } from "@/lib/modules";
import type { TestTypeConfig } from "@/config/test-types";
import { AppHeader } from "@/components/app-header";
import { Button, buttonClassName, Card } from "@/components/ui";
import { Modal } from "@/components/modal";
import { QuestionCard } from "@/components/quiz/question-card";
import { QuizHeader } from "@/components/quiz/quiz-header";
import { quizAttemptStorageKey, type QuizAttempt } from "@/lib/quiz-results";
import { saveCompletedAttempt } from "@/lib/progress-store";
import { getQuizAnswersSnapshot, parseQuizAnswers, quizAnswersStorageKey, quizTimerStorageKey, subscribeToQuizAnswers, writeQuizAnswers } from "@/lib/quiz-session";

type QuizEngineProps = {
  module: QuizModule;
  testType: TestTypeConfig;
};

export function QuizEngine({ module, testType }: QuizEngineProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const answersKey = quizAnswersStorageKey(testType.id, module.id);
  const answersSnapshot = useSyncExternalStore(
    (onChange) => subscribeToQuizAnswers(answersKey, onChange),
    () => getQuizAnswersSnapshot(answersKey),
    () => null,
  );
  const answers = parseQuizAnswers(answersSnapshot);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const durationSeconds = module.durationMinutes * 60;
  const timerKey = quizTimerStorageKey(testType.id, module.id);
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const expirationHandled = useRef(false);
  const submittedRef = useRef(false);
  const questions = module.questions;
  const currentQuestion = questions[currentIndex];
  const unansweredCount = questions.length - Object.keys(answers).length;

  const submitTest = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    try {
      const completedAt = Date.now();
      const savedDeadline = Number(window.sessionStorage.getItem(timerKey));
      const deadline = Number.isFinite(savedDeadline) && savedDeadline > 0
        ? savedDeadline
        : completedAt + durationSeconds * 1000;
      const timeRemainingSeconds = Math.max(0, Math.min(durationSeconds, Math.ceil((deadline - completedAt) / 1000)));
      const attempt: QuizAttempt = {
        version: 1,
        testType: testType.id,
        moduleId: module.id,
        startedAt: deadline - durationSeconds * 1000,
        completedAt,
        durationSeconds,
        timeRemainingSeconds,
        answers,
      };

      window.sessionStorage.setItem(timerKey, String(deadline));
      window.sessionStorage.setItem(quizAttemptStorageKey(testType.id, module.id), JSON.stringify(attempt));
      saveCompletedAttempt(questions, attempt);
      setShowSubmitDialog(false);
      setSubmitted(true);
      router.push(`/quiz/${testType.id}/${module.order}/result`);
    } catch {
      submittedRef.current = false;
      setShowSubmitDialog(false);
      setSubmitted(true);
    }
  }, [answers, durationSeconds, module.id, module.order, questions, router, testType.id, timerKey]);

  useEffect(() => {
    if (submitted) return;

    expirationHandled.current = false;
    const now = Date.now();
    let deadline: number;

    try {
      const savedDeadline = Number(window.sessionStorage.getItem(timerKey));
      if (Number.isFinite(savedDeadline) && savedDeadline > 0) {
        deadline = savedDeadline;
      } else {
        deadline = now + durationSeconds * 1000;
        window.sessionStorage.setItem(timerKey, String(deadline));
      }
    } catch {
      deadline = now + durationSeconds * 1000;
    }

    function updateTimer() {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemainingSeconds(remaining);

      if (remaining === 0 && !expirationHandled.current) {
        expirationHandled.current = true;
        submitTest();
      }
    }

    updateTimer();
    const interval = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(interval);
  }, [durationSeconds, submitTest, submitted, timerKey]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key !== "Enter" ||
        event.repeat ||
        event.isComposing ||
        showSubmitDialog ||
        submitted
      ) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest('button:not([disabled]), a[href], input, textarea, select, [role="dialog"]')
      ) return;

      event.preventDefault();
      if (currentIndex === questions.length - 1) {
        submitTest();
      } else {
        setCurrentIndex((index) => Math.min(questions.length - 1, index + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, questions.length, showSubmitDialog, submitTest, submitted]);

  function selectAnswer(option: QuizOption) {
    if (!currentQuestion) return;
    writeQuizAnswers(answersKey, { ...answers, [currentQuestion.id]: option.id });
  }

  if (questions.length === 0) {
    return (
      <div className="app-shell min-h-screen">
        <AppHeader />
        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Card className="p-6 text-sm text-muted">This module has no available questions.</Card>
        </main>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="app-shell min-h-screen">
        <AppHeader />
        <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <Card as="section" className="p-6 sm:p-8">
            <p className="font-mono text-xs uppercase text-accent">Session complete</p>
            <h1 className="mt-3 text-2xl font-semibold text-foreground">Test submitted</h1>
            <p className="mt-2 text-sm text-muted">Your answers have been submitted.</p>
            <Link className={`${buttonClassName({ size: "small" })} mt-6`} href={`/tests/${testType.id}`}>
              Back to modules
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pt-8 lg:px-8">
        <QuizHeader
          currentQuestion={currentIndex + 1}
          module={module}
          remainingSeconds={remainingSeconds}
          testType={testType}
        />
        <div className="mt-4">
          <QuestionCard
            onSelect={selectAnswer}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            selectedOptionId={answers[currentQuestion.id]}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={() => currentIndex === questions.length - 1
              ? submitTest()
              : setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}>
              {currentIndex === questions.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </main>
      <Modal
        onClose={() => setShowSubmitDialog(false)}
        open={showSubmitDialog}
        title="Submit this test?"
      >
        <p className="text-sm leading-6 text-muted">
          {unansweredCount > 0
            ? `You still have ${unansweredCount} unanswered ${unansweredCount === 1 ? "question" : "questions"}.`
            : "You have answered every question."} Your answers cannot be changed after submission.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={() => setShowSubmitDialog(false)} variant="secondary">Continue test</Button>
          <Button onClick={submitTest}>Submit test</Button>
        </div>
      </Modal>
    </div>
  );
}