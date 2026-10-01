"use client";

import Image from "next/image";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { useSavedAttempt } from "@/components/results/use-saved-attempt";
import { Badge, buttonClassName, Card } from "@/components/ui";
import type { QuizModule } from "@/lib/modules";
import { calculateQuizResult, type QuestionOutcome } from "@/lib/quiz-results";
import type { TestTypeConfig } from "@/config/test-types";

type ReviewScreenProps = {
  module: QuizModule;
  testType: TestTypeConfig;
  filter: "all" | "wrong";
};

export function ReviewScreen({ module, testType, filter }: ReviewScreenProps) {
  const attemptState = useSavedAttempt(testType.id, module.id);
  const result = attemptState.status === "ready"
    ? calculateQuizResult(module.questions, attemptState.attempt)
    : null;
  const outcomes = result?.outcomes ?? [];
  const visibleOutcomes = filter === "wrong"
    ? outcomes.filter((outcome) => outcome.question.correctOptionId !== undefined && outcome.selectedOptionId !== null && !outcome.correct)
    : outcomes;

  return (
    <div className="app-shell min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Badge tone="accent">{testType.name.toUpperCase()} / MODULE {module.order}</Badge>
            <h1 className="mt-4 text-3xl font-semibold text-foreground">Question review</h1>
            <p className="mt-2 text-sm text-muted">
              {filter === "wrong" ? `${visibleOutcomes.length} incorrect answers` : `${module.questionCount} questions`}
            </p>
          </div>
          <Link className={buttonClassName({ variant: "secondary", size: "small" })} href={`/quiz/${testType.id}/${module.order}/result`}>
            Back to results
          </Link>
        </div>
        <nav aria-label="Review filter" className="mb-5 flex gap-3 border-b border-border">
          <Link
            aria-current={filter === "all" ? "page" : undefined}
            className={`inline-flex min-h-11 items-center border-b-2 px-1 text-sm ${filter === "all" ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground"}`}
            href={`/quiz/${testType.id}/${module.order}/review`}
          >
            All questions
          </Link>
          <Link
            aria-current={filter === "wrong" ? "page" : undefined}
            className={`inline-flex min-h-11 items-center border-b-2 px-1 text-sm ${filter === "wrong" ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground"}`}
            href={`/quiz/${testType.id}/${module.order}/review?filter=wrong`}
          >
            Wrong questions
          </Link>
        </nav>
        {attemptState.status === "loading" ? (
          <Card className="p-6 text-sm text-muted">Loading this attempt...</Card>
        ) : attemptState.status === "empty" ? (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">No saved attempt</h2>
            <p className="mt-2 text-sm text-muted">Complete this module before reviewing its answers.</p>
          </Card>
        ) : visibleOutcomes.length === 0 && filter === "wrong" && result?.isScored === false ? (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Wrong answers cannot be determined</h2>
            <p className="mt-2 text-sm text-muted">This development preview has no answer key.</p>
          </Card>
        ) : visibleOutcomes.length === 0 ? (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">No incorrect answers</h2>
            <p className="mt-2 text-sm text-muted">There are no wrong answers in this attempt.</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {visibleOutcomes.map((outcome) => (
              <ReviewedQuestion
                key={outcome.question.id}
                outcome={outcome}
                questionNumber={outcomes.indexOf(outcome) + 1}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

type ReviewedQuestionProps = {
  outcome: QuestionOutcome;
  questionNumber: number;
};

function ReviewedQuestion({ outcome, questionNumber }: ReviewedQuestionProps) {
  const { question } = outcome;
  const status = question.correctOptionId === undefined
    ? "Unscored"
    : outcome.selectedOptionId === null
      ? "Unanswered"
      : outcome.correct
        ? "Correct"
        : "Incorrect";
  const tone = status === "Correct" ? "success" : status === "Incorrect" ? "danger" : status === "Unscored" ? "accent" : "neutral";
  const selectedOption = question.options.find((option) => option.id === outcome.selectedOptionId);
  const correctOption = question.options.find((option) => option.id === question.correctOptionId);

  return (
    <Card as="article" className={`p-4 sm:p-6 ${tone === "danger" ? "border-wrong/60" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase text-muted">Question {questionNumber}</p>
        <Badge tone={tone}>{status}</Badge>
      </div>
      <h2 className="mt-4 text-base font-medium leading-7 text-foreground sm:text-lg">{question.question}</h2>
      {question.image && (
        <Image alt={question.image.alt} className="mt-4 h-auto max-h-72 w-full object-contain" height={540} src={question.image.src} unoptimized width={900} />
      )}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <AnswerDetail label="Your answer" option={selectedOption} fallback="Not answered" />
        <AnswerDetail
          fallback={question.correctAnswer ?? "Not scored for development placeholders."}
          label="Correct answer"
          option={correctOption}
        />
      </div>
      {question.explanation && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="font-mono text-[10px] uppercase text-muted">Explanation</p>
          <p className="mt-2 text-sm leading-6 text-muted">{question.explanation}</p>
        </div>
      )}
    </Card>
  );
}

type AnswerDetailProps = {
  label: string;
  option?: QuestionOutcome["question"]["options"][number];
  fallback: string;
};

function AnswerDetail({ label, option, fallback }: AnswerDetailProps) {
  return (
    <div className="border border-border bg-background p-3">
      <p className="font-mono text-[10px] uppercase text-muted">{label}</p>
      {option?.image ? (
        <Image alt={option.image.alt} className="mt-2 h-auto max-h-28 w-full object-contain" height={280} src={option.image.src} unoptimized width={500} />
      ) : (
        <p className="mt-2 text-sm text-foreground">{option?.text ?? fallback}</p>
      )}
    </div>
  );
}