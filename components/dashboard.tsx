"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { AppHeader } from "@/components/app-header";
import { TestTypeCard } from "@/components/test-type-card";
import { Badge, Button, buttonClassName, Card, Progress } from "@/components/ui";
import { TEST_TYPES } from "@/config/test-types";
import { getProgressSnapshot, parseProgressStore, subscribeToProgress } from "@/lib/progress-store";
import { clearQuizSession } from "@/lib/quiz-session";

const SERVER_PROGRESS_SNAPSHOT = "{\"version\":1,\"attempts\":[]}";

export function Dashboard() {
  const router = useRouter();
  const progressSnapshot = useSyncExternalStore(subscribeToProgress, getProgressSnapshot, () => SERVER_PROGRESS_SNAPSHOT);
  const progress = parseProgressStore(progressSnapshot);
  const attempts = progress.attempts;
  const questionsAttempted = attempts.reduce((total, attempt) => total + attempt.attempted, 0);
  const correctAnswers = attempts.reduce((total, attempt) => total + attempt.correct, 0);
  const accuracy = questionsAttempted === 0 ? null : (correctAnswers / questionsAttempted) * 100;
  const completedModuleCount = new Set(attempts.map((attempt) => `${attempt.testType}:${attempt.moduleId}`)).size;
  const recentAttempts = attempts.slice(0, 5);
  const quickTestCompleted = attempts.some((attempt) => attempt.testType === "verbal" && attempt.moduleId === "module-1");

  function startQuickTest() {
    if (quickTestCompleted) clearQuizSession("verbal", "module-1");
    router.push("/quiz/verbal/1");
  }

  return (
    <div className="app-shell min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <Badge tone="accent">CANDIDATE WORKSPACE / 01</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">Prepare with purpose.</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Focused practice for the PMA Initial Test.</p>
          </div>
          <Button onClick={startQuickTest}>
            Start quick test <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>

        <section aria-label="Your progress" className="grid grid-cols-2 border-b border-border py-6 sm:grid-cols-4">
          <DashboardMetric label="Questions attempted" value={String(questionsAttempted)} />
          <DashboardMetric label="Accuracy" value={accuracy === null ? "--" : `${accuracy.toFixed(1)}%`} />
          <DashboardMetric label="Correct answers" value={String(correctAnswers)} />
          <DashboardMetric label="Completed modules" value={String(completedModuleCount)} />
        </section>

        <section aria-labelledby="recent-results-heading" className="py-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase text-muted">Activity</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground" id="recent-results-heading">Recent results</h2>
            </div>
            {attempts.length > 0 && <p className="font-mono text-xs text-muted">{attempts.length} saved attempts</p>}
          </div>
          {recentAttempts.length === 0 ? (
            <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">No sessions completed yet</p>
                <p className="mt-1 text-sm text-muted">Your results and progress will appear here after a test.</p>
              </div>
              <Link className={buttonClassName({ variant: "secondary", size: "small" })} href="/tests">
                Choose a test
              </Link>
            </Card>
          ) : (
            <ul className="border-t border-border">
              {recentAttempts.map((attempt) => {
                const moduleOrder = Number(attempt.moduleId.slice("module-".length));
                const testName = TEST_TYPES.find((testType) => testType.id === attempt.testType)?.name ?? attempt.testType;

                return (
                  <li className="border-b border-border" key={attempt.id}>
                    <Link
                      className="flex min-h-16 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 hover:bg-card/40"
                      href={`/quiz/${attempt.testType}/${moduleOrder}/result`}
                    >
                      <span>
                        <span className="block text-sm font-medium text-foreground">{testName} / Module {moduleOrder}</span>
                        <span className="mt-1 block text-xs text-muted">{attempt.correct} correct / {attempt.wrong} wrong / {attempt.unanswered} unanswered</span>
                      </span>
                      <span className="font-mono text-sm text-accent">{attempt.scorePercentage.toFixed(1)}%</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section aria-labelledby="test-types-heading" className="border-t border-border pt-8">
          <div className="mb-5">
            <p className="font-mono text-xs uppercase text-muted">Practice library</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground" id="test-types-heading">Choose a test type</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {TEST_TYPES.map((testType) => <TestTypeCard key={testType.id} testType={testType} />)}
          </div>
          {attempts.length > 0 && (
            <Card className="mt-6 p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase text-muted">Overall accuracy</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{accuracy?.toFixed(1)}%</p>
                </div>
                <p className="text-sm text-muted">{correctAnswers} correct from {questionsAttempted} attempted questions</p>
              </div>
              <Progress className="mt-4" label="Overall accuracy" value={accuracy ?? 0} />
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}

type DashboardMetricProps = {
  label: string;
  value: string;
};

function DashboardMetric({ label, value }: DashboardMetricProps) {
  return (
    <div className="border-r border-border px-3 py-2 first:pl-0 last:border-r-0 sm:px-5">
      <p className="font-mono text-[10px] uppercase leading-4 text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}