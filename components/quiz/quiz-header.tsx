import type { QuizModule } from "@/lib/modules";
import type { TestTypeConfig } from "@/config/test-types";
import { Badge, Card, Progress } from "@/components/ui";
import { formatQuizTime } from "@/components/quiz/timer";

type QuizHeaderProps = {
  module: QuizModule;
  testType: TestTypeConfig;
  currentQuestion: number;
  remainingSeconds: number;
};

export function QuizHeader({ module, testType, currentQuestion, remainingSeconds }: QuizHeaderProps) {
  const progress = (currentQuestion / module.questionCount) * 100;

  return (
    <Card as="header" className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge tone="accent">{testType.name} / Module {module.order}</Badge>
          {module.developmentOnly && <Badge className="ml-2" tone="danger">Unscored preview</Badge>}
          <p className="mt-2 font-mono text-xs text-muted">Question {currentQuestion} of {module.questionCount}</p>
        </div>
        <div aria-live="off" className="min-w-24 border-l border-border pl-4 text-right">
          <p className="font-mono text-[10px] uppercase text-muted">Time remaining</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground" role="timer">
            {formatQuizTime(remainingSeconds)}
          </p>
        </div>
      </div>
      <Progress className="mt-4" label="Question progress" value={progress} />
    </Card>
  );
}