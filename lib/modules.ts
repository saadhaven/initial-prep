import type { TestTypeConfig, TestTypeId } from "@/config/test-types";
import { QUESTION_BANKS } from "@/lib/question-banks";
import { normalizeQuestions } from "@/lib/question-normalizer";
import { DEVELOPMENT_NON_VERBAL_QUESTIONS } from "@/data/non-verbal-placeholder";
import type { QuizQuestion } from "@/lib/quiz-types";

export type QuizModule = {
  id: string;
  testType: TestTypeId;
  order: number;
  questionCount: number;
  targetQuestionCount: number;
  durationMinutes: number;
  questions: readonly QuizQuestion[];
  available: boolean;
  developmentOnly: boolean;
};

export function getModules(testType: TestTypeConfig): QuizModule[] {
  const questions = normalizeQuestions(QUESTION_BANKS[testType.id]);

  if (testType.id === "non-verbal") {
    return [
      {
        id: "module-1",
        testType: testType.id,
        order: 1,
        questionCount: DEVELOPMENT_NON_VERBAL_QUESTIONS.length,
        targetQuestionCount: testType.questionCount,
        durationMinutes: testType.durationMinutes,
        questions: DEVELOPMENT_NON_VERBAL_QUESTIONS,
        available: true,
        developmentOnly: true,
      },
    ];
  }

  const moduleCount = Math.ceil(questions.length / testType.questionCount);

  return Array.from({ length: moduleCount }, (_, index) => {
    const start = index * testType.questionCount;
    const moduleQuestions = questions.slice(start, start + testType.questionCount);

    return {
      id: `module-${index + 1}`,
      testType: testType.id,
      order: index + 1,
      questionCount: moduleQuestions.length,
      targetQuestionCount: testType.questionCount,
      durationMinutes: testType.durationMinutes,
      questions: moduleQuestions,
      available: moduleQuestions.length > 0,
      developmentOnly: false,
    };
  });
}