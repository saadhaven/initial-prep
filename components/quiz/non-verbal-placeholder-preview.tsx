"use client";

import { QuestionCard } from "@/components/quiz/question-card";
import { Badge } from "@/components/ui";
import { DEVELOPMENT_NON_VERBAL_QUESTIONS } from "@/data/non-verbal-placeholder";

export function NonVerbalPlaceholderPreview() {
  return (
    <section aria-labelledby="non-verbal-preview-heading" className="mt-10 border-t border-border pt-8">
      <Badge tone="accent">Development preview / not a test</Badge>
      <h2 className="mt-3 text-xl font-semibold text-foreground" id="non-verbal-preview-heading">
        Image question renderer
      </h2>
      <p className="mb-5 mt-2 max-w-2xl text-sm leading-6 text-muted">
        This preview contains no real question, answer key, or PMA imagery. Real image data can replace these placeholders without changing the quiz engine.
      </p>
      <QuestionCard
        disabled
        onSelect={() => undefined}
        question={DEVELOPMENT_NON_VERBAL_QUESTIONS[0]}
        questionNumber={1}
      />
    </section>
  );
}