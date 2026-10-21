import { AppHeader } from "@/components/app-header";
import { TestTypeCard } from "@/components/test-type-card";
import { Badge } from "@/components/ui";
import { TEST_TYPES } from "@/config/test-types";

export default function TestsPage() {
  return (
    <div className="app-shell min-h-screen">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <Badge tone="accent">TEST LIBRARY</Badge>
          <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">Choose your test type</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Select a track to view its modules and start a timed session.
          </p>
        </div>
        <section aria-label="Available test types" className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {TEST_TYPES.map((testType) => (
            <TestTypeCard key={testType.id} testType={testType} />
          ))}
        </section>
      </main>
    </div>
  );
}