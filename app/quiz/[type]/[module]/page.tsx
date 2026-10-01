import { notFound } from "next/navigation";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { TEST_TYPES } from "@/config/test-types";
import { getModules } from "@/lib/modules";

type QuizPageProps = {
  params: Promise<{ type: string; module: string }>;
};

export default async function QuizPage({ params }: QuizPageProps) {
  const { type, module: moduleParameter } = await params;
  const testType = TEST_TYPES.find((candidate) => candidate.id === type);
  const moduleOrder = Number(moduleParameter);

  if (!testType || !Number.isInteger(moduleOrder) || moduleOrder < 1) notFound();

  const selectedModule = getModules(testType).find((candidate) => candidate.order === moduleOrder);
  if (!selectedModule?.available) notFound();

  return <QuizEngine key={`${testType.id}-${selectedModule.id}`} module={selectedModule} testType={testType} />;
}