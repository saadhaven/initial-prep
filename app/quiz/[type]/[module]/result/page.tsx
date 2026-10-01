import { notFound } from "next/navigation";
import { ResultScreen } from "@/components/results/result-screen";
import { TEST_TYPES } from "@/config/test-types";
import { getModules } from "@/lib/modules";

type ResultPageProps = {
  params: Promise<{ type: string; module: string }>;
};

export default async function ResultPage({ params }: ResultPageProps) {
  const { type, module: moduleParameter } = await params;
  const testType = TEST_TYPES.find((candidate) => candidate.id === type);
  const moduleOrder = Number(moduleParameter);

  if (!testType || !Number.isInteger(moduleOrder) || moduleOrder < 1) notFound();

  const selectedModule = getModules(testType).find((candidate) => candidate.order === moduleOrder);
  if (!selectedModule?.available) notFound();

  return <ResultScreen module={selectedModule} testType={testType} />;
}