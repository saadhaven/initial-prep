import Link from "next/link";

const navLinkClassName =
  "min-h-11 inline-flex items-center border-b border-transparent px-1 text-sm text-muted transition-colors hover:border-accent hover:text-foreground";

export function AppHeader() {
  return (
    <header className="border-b border-border bg-background/95">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link aria-label="PMA Initial Prep home" className="group flex items-center gap-3" href="/">
          <span className="flex size-10 items-center justify-center border border-accent/50 bg-card font-mono text-xs font-bold text-accent">
            PMA
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">INITIAL PREP</span>
            <span className="font-mono text-[10px] uppercase text-muted">Candidate workspace</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-7">
          <Link className={`${navLinkClassName} hidden sm:inline-flex`} href="/">
            Overview
          </Link>
          <Link className="inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-4 text-sm font-semibold text-foreground transition-colors hover:bg-primary-hover" href="/tests">
            Practice tests
          </Link>
        </nav>
      </div>
    </header>
  );
}