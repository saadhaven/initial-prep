import Image from "next/image";
import type { QuizOption, QuizQuestion } from "@/lib/quiz-types";
import { Card } from "@/components/ui";

type QuestionCardProps = {
  question: QuizQuestion;
  questionNumber: number;
  selectedOptionId?: string;
  disabled?: boolean;
  onSelect: (option: QuizOption) => void;
};

export function QuestionCard({ question, questionNumber, selectedOptionId, disabled = false, onSelect }: QuestionCardProps) {
  const hasSelection = selectedOptionId !== undefined;
  const isScored = question.correctOptionId !== undefined;
  const selectedAnswerIsCorrect = selectedOptionId === question.correctOptionId;

  return (
    <Card as="section" aria-labelledby="question-prompt" className="p-4 sm:p-7">
      <p className="font-mono text-xs uppercase text-muted">Question {questionNumber}</p>
      <h2 className="mt-4 text-lg font-medium leading-7 text-foreground sm:text-xl" id="question-prompt">
        {question.question}
      </h2>
      {question.image && (
        <Image
          alt={question.image.alt}
          className="mt-5 h-auto max-h-80 w-full object-contain"
          height={600}
          src={question.image.src}
          unoptimized
          width={1000}
        />
      )}
      {question.type === "image" && !question.image && (
        <div aria-label="Question image placeholder" className="mt-5 flex min-h-36 items-center justify-center border border-dashed border-border bg-background font-mono text-xs uppercase text-muted" role="img">
          Question image placeholder
        </div>
      )}
      <div aria-label="Answer options" className="mt-6 grid gap-3" role="group">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrectOption = isScored && option.id === question.correctOptionId;
          const isIncorrectSelection = isScored && hasSelection && isSelected && !isCorrectOption;
          const resultClassName = isScored && hasSelection
            ? isCorrectOption
              ? "border-correct bg-correct/15 text-foreground"
              : isIncorrectSelection
                ? "border-wrong bg-wrong/15 text-foreground"
                : "border-border bg-background text-muted"
            : isSelected
              ? "border-primary bg-primary/15 text-foreground"
              : "border-border bg-background text-foreground hover:border-muted";

          return (
            <button
              aria-pressed={isSelected}
              className={`flex min-h-12 w-full items-center gap-3 border px-3 py-2.5 text-left transition-colors sm:px-4 ${resultClassName}`}
              disabled={disabled || hasSelection}
              key={option.id}
              onClick={() => onSelect(option)}
              type="button"
            >
              <span className="flex size-8 shrink-0 items-center justify-center border border-border font-mono text-xs text-accent">
                {option.label}
              </span>
              {option.image ? (
                <Image
                  alt={option.image.alt}
                  className="h-auto max-h-36 w-full max-w-64 object-contain"
                  height={360}
                  src={option.image.src}
                  unoptimized
                  width={640}
                />
              ) : option.type === "image" ? (
                <span aria-label={`${option.label} option image placeholder`} className="flex min-h-20 flex-1 items-center justify-center border border-dashed border-border bg-card font-mono text-[10px] uppercase text-muted" role="img">
                  Option image placeholder
                </span>
              ) : (
                <span className="text-sm leading-6">{option.text}</span>
              )}
              {hasSelection && isScored && isCorrectOption && (
                <span className="ml-auto shrink-0 font-mono text-[10px] uppercase text-correct">Correct</span>
              )}
              {isIncorrectSelection && (
                <span className="ml-auto shrink-0 font-mono text-[10px] uppercase text-wrong">Your answer</span>
              )}
            </button>
          );
        })}
      </div>
      {hasSelection && isScored && (
        <div aria-live="polite" className={`mt-5 border p-4 ${selectedAnswerIsCorrect ? "border-correct/50 bg-correct/10" : "border-wrong/50 bg-wrong/10"}`} role="status">
          <p className={`text-sm font-semibold ${selectedAnswerIsCorrect ? "text-correct" : "text-wrong"}`}>
            {selectedAnswerIsCorrect ? "Correct" : "Incorrect"}
          </p>
          {!selectedAnswerIsCorrect && question.explanation && (
            <p className="mt-2 text-sm leading-6 text-foreground">{question.explanation}</p>
          )}
        </div>
      )}
    </Card>
  );
}