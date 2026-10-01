import Link from "next/link";
import type { TestTypeConfig } from "@/config/test-types";
import { Badge, buttonClassName, Card } from "@/components/ui";

type TestTypeCardProps = {
  testType: TestTypeConfig;
};

export function TestTypeCard({ testType }: TestTypeCardProps) {
  const isInDevelopment = testType.availability === "development";

  return (
    <Card as="article" className="flex min-h-[18rem] flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase text-muted">PMA / {testType.id}</span>
        <Badge tone={isInDevelopment ? "accent" : "success"}>
          {isInDevelopment ? "Development" : "Ready"}
        </Badge>
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-foreground">{testType.name}</h2>
      <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{testType.description}</p>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <dt className="font-mono text-[10px] uppercase text-muted">Questions / module</dt>
          <dd className="mt-1 text-lg font-semibold text-foreground">{testType.questionCount}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase text-muted">Time limit</dt>
          <dd className="mt-1 text-lg font-semibold text-foreground">{testType.durationMinutes} min</dd>
        </div>
      </dl>
      <div className="mt-auto pt-6">
        <Link
          className={buttonClassName({ size: "small", className: "w-full" })}
          href={`/tests/${testType.id}`}
        >
          View modules <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </Card>
  );
}