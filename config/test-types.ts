export type TestTypeId = "verbal" | "non-verbal" | "academic";

export const PASSING_SCORE_PERCENTAGE = 50;

export type TestTypeConfig = {
  id: TestTypeId;
  name: string;
  questionCount: number;
  durationMinutes: number;
  description: string;
  availability: "ready" | "development";
};

export const TEST_TYPES = [
  {
    id: "verbal",
    name: "Verbal",
    questionCount: 84,
    durationMinutes: 30,
    description: "Reasoning, word relationships, arithmetic, and direction questions from the verbal bank.",
    availability: "ready",
  },
  {
    id: "non-verbal",
    name: "Non-Verbal",
    questionCount: 64,
    durationMinutes: 30,
    description: "Image-based reasoning practice. Question artwork is not yet available.",
    availability: "development",
  },
  {
    id: "academic",
    name: "Academic",
    questionCount: 50,
    durationMinutes: 30,
    description: "General knowledge and academic practice from the available question banks.",
    availability: "ready",
  },
] as const satisfies readonly TestTypeConfig[];