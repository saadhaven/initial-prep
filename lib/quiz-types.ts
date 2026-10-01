export type QuizImage = {
  src: string;
  alt: string;
};

export type QuizOption = {
  id: string;
  label: string;
  type: "text" | "image";
  text?: string;
  image?: QuizImage;
};

export type QuizQuestion = {
  id: string;
  question: string;
  type: "text" | "image";
  image?: QuizImage;
  options: readonly QuizOption[];
  correctAnswer?: string;
  correctOptionId?: string;
  explanation?: string;
};