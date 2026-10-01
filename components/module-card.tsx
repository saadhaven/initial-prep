"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import type { TestTypeId } from "@/config/test-types";
import type { QuizModule } from "@/lib/modules";
import { Badge, Button, buttonClassName, Card } from "@/components/ui";
import { getProgressSnapshot, parseProgressStore, subscribeToProgress } from "@/lib/progress-store";
import { clearQuizSession } from "@/lib/quiz-session";

const SERVER_PROGRESS_SNAPSHOT = "{\"version\":1,\"attempts\":[]}";

type ModuleCardProps = {
  module: QuizModule;
  testType: TestTypeId;
};

export function ModuleCard({ module, testType }: ModuleCardProps) {
  const router = useRouter();
  const progressSnapshot = useSyncExternalStore(subscribeToProgress, getProgressSnapshot, () => SERVER_PROGRESS_SNAPSHOT);
  const progress = parseProgressStore(progressSnapshot);
  const latestAttempt = progress.attempts.find(
    (attempt) => attempt.testType === testType && attempt.moduleId === module.id,
  );
  const isPartial = module.available && module.questionCount < module.targetQuestionCount;
  const completed = module.available && latestAttempt !== undefined;

  function retakeModule() {
    clearQuizSession(testType, module.id);
    router.push(`/quiz/${testType}/${module.order}`);
  }

  return (
    <Card as="article" className="flex min-h-60 flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase text-muted">Module {module.order}</p>
        <Badge tone={completed ? "success" : module.available && !isPartial ? "neutral" : "accent"}>
          {completed ? "Completed" : module.developmentOnly ? "Development placeholders" : isPartial ? "Partial module" : module.available ? "Not started" : "In development"}
        </Badge>
      </div>
      {latestAttempt && (
        <p className="mt-4 text-sm text-muted">
          Score <span className="font-semibold text-foreground">{latestAttempt.scorePercentage.toFixed(1)}%</span>
          <span className="px-2 text-border">/</span>
          {latestAttempt.correct} correct
          <span className="px-2 text-border">/</span>
          {latestAttempt.wrong} wrong
        </p>
      )}
      <dl className="mt-7 grid grid-cols-2 gap-4">
        <div>
          <dt className="font-mono text-[10px] uppercase text-muted">Questions</dt>
          <dd className="mt-1 text-lg font-semibold text-foreground">{module.questionCount}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase text-muted">Time limit</dt>
          <dd className="mt-1 text-lg font-semibold text-foreground">{module.durationMinutes} min</dd>
        </div>
      </dl>
      <div className="mt-auto border-t border-border pt-5">
        {completed ? (
          <div className="flex flex-col gap-2">
            <Link className={buttonClassName({ size: "small", className: "w-full" })} href={`/quiz/${testType}/${module.order}/result`}>
              Review test
            </Link>
            <Button onClick={retakeModule} size="small" variant="secondary">Retake</Button>
          </div>
        ) : module.available ? (
          <Link className={buttonClassName({ size: "small", className: "w-full" })} href={`/quiz/${testType}/${module.order}`}>
            {module.developmentOnly ? "Start placeholder test" : "Start test"} <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : (
          <button className={buttonClassName({ size: "small", className: "w-full" })} disabled type="button">
            Placeholder data pending
          </button>
        )}
      </div>
    </Card>
  );
}

type ModuleGridProps = {
  modules: readonly QuizModule[];
  testType: TestTypeId;
};

export function ModuleGrid({ modules, testType }: ModuleGridProps) {
  if (modules.length === 0) {
    return <p className="border border-border bg-card p-5 text-sm text-muted">No questions are available for this test type yet.</p>;
  }

  return (
    <section aria-label="Test modules" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} testType={testType} />
      ))}
    </section>
  );
}