import { notFound } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { ModuleGrid } from "@/components/module-card";
import { NonVerbalPlaceholderPreview } from "@/components/quiz/non-verbal-placeholder-preview";
import { Badge } from "@/components/ui";
import { TEST_TYPES } from "@/config/test-types";
import { getModules } from "@/lib/modules";

type TestTypePageProps = {
  params: Promise<{ type: string }>;
};

export default async function TestTypePage({ params }: TestTypePageProps) {
  const { type } = await params;
  const testType = TEST_TYPES.find((candidate) => candidate.id === type);

  if (!testType) notFound();

  const modules = getModules(testType);

  return (
    <div className="app-shell min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <Badge tone="accent">{testType.name.toUpperCase()} / MODULES</Badge>
          <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">{testType.name} modules</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            {testType.questionCount} questions per module / {testType.durationMinutes} minutes
          </p>
        </div>
        <ModuleGrid modules={modules} testType={testType.id} />
        {testType.id === "non-verbal" && <NonVerbalPlaceholderPreview />}
      </main>
    </div>
  );
}