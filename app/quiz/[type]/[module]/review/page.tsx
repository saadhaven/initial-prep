import { notFound } from "next/navigation";
import { ReviewScreen } from "@/components/results/review-screen";
import { TEST_TYPES } from "@/config/test-types";
import { getModules } from "@/lib/modules";

type ReviewPageProps = {
  params: Promise<{ type: string; module: string }>;
  searchParams: Promise<{ filter?: string }>;
};

export default async function ReviewPage({ params, searchParams }: ReviewPageProps) {
  const [{ type, module: moduleParameter }, query] = await Promise.all([params, searchParams]);
  const testType = TEST_TYPES.find((candidate) => candidate.id === type);
  const moduleOrder = Number(moduleParameter);

  if (!testType || !Number.isInteger(moduleOrder) || moduleOrder < 1) notFound();

  const selectedModule = getModules(testType).find((candidate) => candidate.order === moduleOrder);
  if (!selectedModule?.available) notFound();

  return (
    <ReviewScreen
      filter={query.filter === "wrong" ? "wrong" : "all"}
      module={selectedModule}
      testType={testType}
    />
  );
}