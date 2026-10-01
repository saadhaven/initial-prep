"use client";

import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { formatQuizTime } from "@/components/quiz/timer";
import { useSavedAttempt } from "@/components/results/use-saved-attempt";
import { Badge, buttonClassName, Card, Progress } from "@/components/ui";
import { PASSING_SCORE_PERCENTAGE } from "@/config/test-types";
import type { QuizModule } from "@/lib/modules";
import { calculateQuizResult } from "@/lib/quiz-results";
import type { TestTypeConfig } from "@/config/test-types";

type ResultScreenProps = {
  module: QuizModule;
  testType: TestTypeConfig;
};

export function ResultScreen({ module, testType }: ResultScreenProps) {
  const attemptState = useSavedAttempt(testType.id, module.id);
  const attempt = attemptState.status === "ready" ? attemptState.attempt : null;

  const result = attempt ? calculateQuizResult(module.questions, attempt) : null;
  const passed = result?.scorePercentage !== null && result?.scorePercentage !== undefined && result.scorePercentage >= PASSING_SCORE_PERCENTAGE;

  return (
    <div className="app-shell min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mb-7">
          <Badge tone="accent">{testType.name.toUpperCase()} / MODULE {module.order} / RESULTS</Badge>
          <h1 className="mt-4 text-3xl font-semibold text-foreground">Module results</h1>
        </div>
        {attemptState.status === "loading" ? (
          <Card className="p-6 text-sm text-muted">Loading this attempt...</Card>
        ) : result ? (
          <>
            <Card as="section" className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase text-muted">{result.isScored ? "Score" : "Development preview"}</p>
                <Badge tone={!result.isScored ? "neutral" : passed ? "success" : "danger"}>
                  {!result.isScored ? "Unscored" : passed ? "Pass" : "Fail"}
                </Badge>
              </div>
              <p className={`mt-2 text-5xl font-semibold tabular-nums ${!result.isScored ? "text-foreground" : passed ? "text-correct" : "text-wrong"}`}>
                {result.scorePercentage === null ? "Unscored" : `${result.scorePercentage.toFixed(1)}%`}
              </p>
              <p className="mt-2 text-sm text-muted">
                {result.isScored ? `Calculated from all ${result.total} questions.` : "Placeholder questions are not included in accuracy or progress."}
              </p>
            </Card>
            <section aria-label="Overall results" className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <ResultMetric label="Correct" value={result.isScored ? result.correct : "N/A"} tone="success" />
              <ResultMetric label="Wrong" value={result.isScored ? result.wrong : "N/A"} tone="danger" />
              <ResultMetric label="Unanswered" value={result.unanswered} />
              <ResultMetric label="Attempted" value={result.attempted} />
            </section>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Card className="p-5">
                <p className="font-mono text-xs uppercase text-muted">Questions</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{result.total} total</p>
                <Progress className="mt-4" label="Attempted questions" value={result.total ? (result.attempted / result.total) * 100 : 0} />
                <p className="mt-2 text-xs text-muted">{result.attempted} attempted / {result.unanswered} unanswered</p>
              </Card>
              <Card className="p-5">
                <p className="font-mono text-xs uppercase text-muted">Time</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{formatQuizTime(result.timeUsedSeconds)} used</p>
                <p className="mt-2 text-sm text-muted">{formatQuizTime(result.timeUsedSeconds + result.timeRemainingSeconds)} limit</p>
                {result.timeRemainingSeconds > 0 && (
                  <p className="mt-1 text-sm text-muted">{formatQuizTime(result.timeRemainingSeconds)} remaining</p>
                )}
              </Card>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonClassName({})} href={`/quiz/${testType.id}/${module.order}/review`}>
                Review all questions
              </Link>
              {result.isScored && (
                <Link className={buttonClassName({ variant: "secondary" })} href={`/quiz/${testType.id}/${module.order}/review?filter=wrong`}>
                  Review wrong questions
                </Link>
              )}
              <Link className={buttonClassName({ variant: "quiet" })} href={`/tests/${testType.id}`}>
                Back to modules
              </Link>
            </div>
          </>
        ) : (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">No saved attempt</h2>
            <p className="mt-2 text-sm text-muted">Start this module to create a result summary.</p>
            <Link className={`${buttonClassName({ size: "small" })} mt-5`} href={`/tests/${testType.id}`}>
              Back to modules
            </Link>
          </Card>
        )}
      </main>
    </div>
  );
}

type ResultMetricProps = {
  label: string;
  value: number | string;
  tone?: "neutral" | "success" | "danger";
};

function ResultMetric({ label, value, tone = "neutral" }: ResultMetricProps) {
  const valueColor = tone === "success" ? "text-correct" : tone === "danger" ? "text-wrong" : "text-foreground";

  return (
    <Card className="p-4">
      <p className="font-mono text-[10px] uppercase text-muted">{label}</p>
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${valueColor}`}>{value}</p>
    </Card>
  );
}