# Implementation Notes

## Phase 0: Repository Audit

- Stack: Next.js 16.3.6 App Router, React 19.2.8, strict TypeScript 5, Tailwind CSS 4 via `@tailwindcss/postcss`; no `tailwind.config` file.
- Existing routes: only `app/page.tsx`; layout and global styles are in `app/layout.tsx` and `app/globals.css`. `components/`, `lib/`, and `utils/` have no existing implementation.
- `data/verbal.ts` and `data/academic.ts` define the same direct MCQ shape: `question: string`, four-string tuple `options`, `correctAnswer: string`, and `reason: string`. They export `mcqsArray1` (verbal) and `mcqsArray1` through `mcqsArray32` (academic). Neither shape includes IDs or image fields.
- `data/pak-study.ts` uses that MCQ shape and exports `mcqsArray1`.
- `data/english.ts` uses the MCQ shape as output, but its source rows store a four-string options tuple and a numeric answer index; it exports two converted arrays.
- `data/academic-2.ts` stores question/answer tuples, then creates four string options and an explanation while converting them to the shared MCQ shape; it exports `mcqsArray1`.
- Additional relevant files present: `academic-2.ts`, `english.ts`, and `pak-study.ts`. There are also PDFs in `data/`, but no image-question bank is present.
- Verified data inventory: verbal has 84 questions; `academic.ts` has 32 arrays of 50 (1,600 total); `academic-2.ts` has 337; English has 137; Pakistan Studies has 100. All academic sources total 2,174 records. No source MCQ has a stable ID.
- Academic text comparison finds 122 repeated question groups (147 repeated rows), including 9 groups across source files. Many repeated groups have different answers or options, so module generation preserves every existing record in source order instead of deduplicating or rewriting them. Source bank and row indexes are carried forward for deterministic IDs in the normalization phase.
- At audit start, the layout used Google-hosted Geist fonts and starter metadata, and the page/CSS were the default Next.js starter. No existing UI components or other routes needed preservation.

## Phase 1

- Implemented the shared palette/theme tokens, responsive application shell, reusable Card/Button/Badge/Progress/Modal components, and PMA metadata.
- `pnpm lint` and `pnpm build` pass. Browser checks at 360px and 1280px showed no horizontal overflow.

## Phase 2

- Added centralized test type configuration and a reusable test type card on `/tests` for Verbal (84), Non-Verbal (64), and Academic (50); Non-Verbal is labeled development-only.
- `pnpm lint` and `pnpm build` pass. The route renders three cards and fits a 390px viewport without horizontal overflow.

## Phase 3

- Added explicit question bank aggregation and data-driven module splitting. Academic sources are combined in a stable order without deduplicating source records; source-bank identifiers and row indexes are retained for the normalization phase.
- At this phase, one Verbal module and 44 Academic modules were generated; Non-Verbal remained disabled until the final audit added its placeholder-only flow.
- The partial and development-only states are explicit in the module UI. `pnpm lint` and `pnpm build` pass.

## Phase 4

- Added a normalized question/option model with text and image variants, explanation support, and deterministic IDs derived from source bank name and row number.
- Connected module output to normalized questions without editing source data. Runtime invariant check passed for all 2,258 records: unique IDs, four options each, and every correct-option ID resolves. `pnpm lint` and `pnpm build` pass.

## Phase 5

- Added the shared quiz engine, option selection, previous/next controls, question navigator, answered state, and manual submission confirmation. Active UI does not display correctness.
- Browser interaction check verified answer preservation, question jumps, the 83-unanswered confirmation, and submission. `pnpm lint` and `pnpm build` pass.

## Phase 6

- Replaced the static timer display with a one-second deadline-based countdown and same-tab `sessionStorage` deadline persistence. Zero submits without manual confirmation.
- Browser checks verified deadline reuse after refresh and automatic submission after expiry. `pnpm lint` and `pnpm build` pass.

## Phase 7

- Added validated attempt snapshots and immediate result analytics: score over total questions, correct/wrong/unanswered/attempted, time used, and early-submission time remaining.
- A real Verbal browser run with one correct, one wrong, and 82 unanswered reported 1.2%, 2 attempted, and accurate time values. Pure result arithmetic invariants and `pnpm lint` / `pnpm build` pass.

## Phase 8

- Added untimed review routes for all module questions and incorrect answered questions, including selected answer, correct answer, status label, and explanation when provided.
- Browser verification showed all 84 Verbal questions in All mode and exactly one incorrect question in Wrong mode, with its correct answer and explanation. `pnpm lint` and `pnpm build` pass.

## Phase 9

- Added a clearly marked Non-Verbal image-renderer preview with placeholder prompt and option-image slots, no answer key, and disabled controls. No real Non-Verbal question content is present.
- Generic question rendering now supports both real image sources and accessible missing-image placeholders. Browser verification showed the full preview; a server/client boundary issue was fixed. `pnpm lint` and `pnpm build` pass.

## Phase 10

- Checked the active quiz at 360, 390, 414, 768, 1024, and 1280px. No horizontal overflow; mobile question and navigator fit the content width, and desktop uses a two-column layout.

## Phase 11

- Active answer selections and absolute deadlines persist in same-tab session storage. Completed attempt summaries persist in a versioned local progress store, and completed module cards show the latest score with Review and Retake actions.
- Browser verification confirmed answer restoration after refresh, completed status and score, and a fresh timer/empty answer set on retake while retaining attempt history. `pnpm lint` and `pnpm build` pass.

## Phase 12

- Replaced the home shell with a progress-aware dashboard containing quick start, test type cards, attempted/accuracy/correct/completed metrics, recent results, and an honest empty state.
- Browser checks verified both empty and populated summaries (including 50% overall accuracy and a 1.2% result) and no horizontal overflow at 360, 390, 768, or 1280px. Temporary browser test data was cleared. `pnpm lint` and `pnpm build` pass.

## Phase 13

- Final audit completed the Non-Verbal development path with 64 image placeholders, a 30-minute timer, shared navigation/submission, and explicitly unscored results/review. These attempts do not affect accuracy or progress history.
- Improved dialog keyboard focus management and ensured quick start resets a completed session without disturbing an in-progress one.
- Final lint and production build pass. Core checks cover 84 Verbal questions, 50-question Academic modules plus the 24-question remainder, and 64 unscored Non-Verbal placeholders. Browser checks verified submission, review, persistence, mobile widths, and no horizontal overflow.
- Updated the active quiz to show immediate green/red correctness feedback, wrong-answer explanations, no Previous action, and Submit on the final question. Results mark 50% or higher as Pass; lower scores are Fail. Browser checks verified both answer colors/reason and final submission confirmation.
- The Verbal source contains exactly 84 questions, so one 84-question module is correct. Module generation already chunks surplus questions into further modules if the source bank grows.
- Academic browser submission confirmed 50 questions, a 30-minute limit, and one correct out of 50 scoring 2.0%; temporary browser data was restored afterward.

## Verbal PDF Expansion

- Preserved the existing 84 Verbal records and appended 26 prompts missing from the supplied PDF: its numbered questions 85–105 and five unnumbered prompts.
- The resulting modules contain 84 and 26 questions, both with the configured 30-minute duration. All records have four options and a correct answer present among those options.
- The PDF provided answer keys but no option lists for these prompts, so distractor options were added to fit the existing MCQ model. The two alphabet-order answers are retained from the supplied PDF key.
- `pnpm lint` and `pnpm build` pass; the browser confirmed Module 2 advances sequentially through question 26 and ends with Submit.
