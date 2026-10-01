# Project Guidance

## Stack and Structure
- This project uses Next.js 16 App Router, React 19, and TypeScript.
- Route files and global styles live in `app/`; reusable UI belongs in `components/` and static content/data in `data/`.
- Prefer Server Components. Add a Client Component only when browser state, event handlers, or another client-only API is needed.
- Styling uses Tailwind CSS 4. Follow the conventions already present in the surrounding files.

## Commands
- Use `pnpm dev` to run the development server.
- Use `pnpm lint` to run ESLint.
- Use `pnpm build` to verify a production build.

## Change Practices
- Keep changes focused and preserve existing public interfaces unless the task requires otherwise.
- Use the existing App Router, metadata, and component patterns rather than introducing another framework or styling system.
- Add or update tests when a suitable test setup exists; this project currently exposes lint and build scripts only.


# PMA Initial Prep — AGENTS.md

## 1. PROJECT PURPOSE

Build a modern, fast, mobile-first PMA Initial Test preparation web app using Next.js.

The application is primarily a quiz/practice platform.

The core experience is:

Select Test Type
→ Select Module
→ Start timed test
→ Answer questions
→ Submit/finish
→ Show detailed analytics
→ Review correct/wrong answers
→ Continue to next module

The application must focus on practice, timed testing, performance tracking, and question review.

Do NOT turn the application into a generic educational/blog website.

---

# 2. EXISTING QUESTION DATA

Question data already exists in TypeScript files.

Expected data locations:

@/data/verbal.ts
@/data/academic-1.ts
@/data/academic-2.ts
@/data/english.ts
@/data/pak-study.ts

Additional academic files may exist.

DO NOT recreate existing MCQs.

DO NOT manually rewrite existing questions.

DO NOT modify existing question content unless explicitly requested.

DO NOT generate fake questions to fill missing data.

The application must import and consume the existing arrays.

Before implementing the quiz engine, inspect the existing data structure and adapt the application to it.

---

# 3. TEST TYPES

The application has exactly three primary test types:

1. Verbal
2. Non-Verbal
3. Academic

The main Tests page must present these as separate cards.

Example:

Verbal
84 Questions
30 Minutes

Non-Verbal
64 Questions
30 Minutes

Academic
50 Questions
30 Minutes

---

# 4. TEST CONFIGURATION

## VERBAL

Total questions per module:

84

Time:

30 minutes

Each verbal module contains 84 questions.

The timer starts when the module starts.

The test automatically finishes when the timer reaches zero.

---

## NON-VERBAL

Total questions per module:

64

Time:

30 minutes

Non-verbal question functionality should initially use PLACEHOLDER DATA/UI.

Do NOT invent actual non-verbal questions.

Create the architecture so real non-verbal image questions can be added later without changing the quiz engine.

Expected future structure:

question image
+
A image
+
B image
+
C image
+
D image

---

## ACADEMIC

Total questions per module:

50

Time:

30 minutes

Academic questions come from the existing academic arrays.

Academic modules must consume the existing data without changing the source arrays.

---

# 5. MODULE SYSTEM

Each test type is divided into modules.

Example:

VERBAL

Module 1
84 Questions
30 Minutes

Module 2
84 Questions
30 Minutes

Module 3
84 Questions
30 Minutes

etc.

ACADEMIC

Module 1
50 Questions
30 Minutes

Module 2
50 Questions
30 Minutes

Module 3
50 Questions
30 Minutes

etc.

NON-VERBAL

Module 1
64 Questions
30 Minutes

Module 2
64 Questions
30 Minutes

Module 3
64 Questions
30 Minutes

etc.

The module system must be data-driven.

DO NOT hardcode separate quiz implementations for Module 1, Module 2, Module 3.

Use reusable configuration and components.

---

# 6. MODULE CARD DESIGN

Each module should appear as a card.

Example:

Module 1
84 Questions
30 Minutes

Status:
Not Started

[ Start Test ]

After completion:

Module 1
84 Questions
30 Minutes

Score:
72%

Correct:
60

Wrong:
24

Status:
Completed

[ Review Test ]

If appropriate, also provide:

[ Retake ]

Do not expose answers before the test starts.

---

# 7. QUIZ ENGINE

Build ONE reusable quiz engine.

The engine should support:

- Verbal
- Non-Verbal
- Academic
- Future question types

The engine must receive configuration/data rather than contain type-specific hardcoded logic.

Conceptually:

QuizEngine
├── question list
├── question renderer
├── answer state
├── timer
├── navigation
├── submission
├── result calculation
└── analytics

---

# 8. QUESTION MODEL

Use a normalized internal question interface.

The existing data may use a different interface.

Do NOT force the existing data files to change unnecessarily.

Create an adapter/normalizer if required.

The internal question model should support:

- id
- question
- options
- correctAnswer
- reason/explanation
- type
- optional image
- optional option images

Example conceptual interface:

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  reason?: string;
  type: "text" | "image";
  image?: string;
  optionImages?: string[];
}

Adapt this to the actual existing data structure.

---

# 9. ANSWER HANDLING

For every question store:

- selected answer
- correct answer
- whether correct
- whether answered
- question index

Do not reveal the correct answer during an active timed test.

The user should only receive correctness/explanations after submission.

---

# 10. TIMER

Every module has a 30-minute timer.

Timer requirements:

- Start at 30:00
- Count down every second
- Display prominently
- Persist timer state during normal React re-renders
- Avoid timer reset when navigating between questions
- Automatically submit when reaching 00:00

Do not rely only on setInterval count increments.

Use an absolute end timestamp or equivalent reliable mechanism.

The timer must not restart simply because the component rerenders.

---

# 11. QUIZ NAVIGATION

Support:

- Next
- Previous
- Question number navigation
- Answered/unanswered indicators
- Current question indicator
- Submit test

Example:

Question 17 / 84

[ 1 ][ 2 ][ 3 ][ 4 ][ 5 ]...

Answered questions should have a distinct visual state.

Current question should be clearly highlighted.

Unanswered questions should remain visually distinguishable.

---

# 12. SUBMISSION

The test can end in two ways:

1. User manually submits
2. Timer reaches zero

Before manual submission, show a confirmation dialog.

Example:

"You still have 12 unanswered questions. Are you sure you want to submit?"

If timer reaches zero:

Submit automatically.

Never lose the user's answers.

---

# 13. RESULT SCREEN

Every completed module MUST show a result screen immediately.

Minimum information:

- Total questions
- Attempted
- Correct
- Wrong
- Unanswered
- Score percentage
- Time used
- Time remaining, if submitted early

Example:

Module Complete

72%

60 Correct
24 Wrong
0 Unanswered

84 Total Questions

30:00 Time Limit

---

# 14. ANALYTICS

After every module, show useful analytics.

Minimum analytics:

### Overall

- Percentage
- Correct
- Wrong
- Unanswered
- Attempted

### Performance

- Correct percentage
- Wrong percentage
- Attempted percentage

### Question Review

Show every attempted question.

For each question:

Question
User Answer
Correct Answer
Correct/Wrong status
Reason/explanation

Wrong questions must be easy to identify.

---

# 15. WRONG QUESTIONS REVIEW

The result page should allow:

[ Review Wrong Questions ]

This should filter the result to only incorrect questions.

Also support:

[ Review All Questions ]

Review mode is not timed.

The correct answer and explanation can be shown in review mode.

---

# 16. SCORE CALCULATION

Use:

percentage = (correct / totalQuestions) * 100

Display percentage cleanly.

Example:

72.0%

or

72%

Avoid misleading calculations.

Clearly distinguish:

Attempted
Correct
Wrong
Unanswered

Attempted = correct + wrong.

---

# 17. DESIGN SYSTEM

Use the selected palette.

Primary palette:

Background:
#0B1110

Card:
#121A17

Primary:
#4F7A5A

Primary Hover:
#628F6B

Accent:
#C6A15B

Foreground:
#F1F4F1

Muted:
#9AA69E

Border:
#26332D

Correct:
#3FA66B

Wrong:
#C95C5C

---

# 18. DESIGN STYLE

The application should look:

- Professional
- Mature
- Military-inspired
- Modern
- Minimal
- Focused
- Fast
- Premium
- Exam-oriented

Avoid:

- Cartoonish UI
- Excessive gradients
- Neon colors
- Excessive animations
- Gaming-style UI
- Excessive glassmorphism
- Huge decorative illustrations
- Cluttered dashboards

The app should feel like a serious preparation platform.

---

# 19. COLOR USAGE

Do not use green for everything.

Primary green:
- Main CTAs
- Active states
- Selected controls
- Important actions

Gold:
- Accent
- Small highlights
- Important metadata
- Achievement elements

Green correctness:
#3FA66B

Red correctness:
#C95C5C

Do not use red/green as the only indication of state.

Combine color with:

- Icons
- Text
- Borders
- Labels

This improves accessibility.

---

# 20. TYPOGRAPHY

Use a clean modern sans-serif font.

Prioritize readability.

Question text should be large enough for mobile screens.

Do not use decorative military fonts.

Use font weight to establish hierarchy.

Suggested hierarchy:

Page heading:
text-2xl to text-4xl

Quiz question:
text-lg to text-2xl

Options:
text-base to text-lg

Metadata:
text-sm

---

# 21. RESPONSIVE DESIGN

Mobile-first.

Primary target:

360px
390px
414px

Also support:

768px
1024px
1280px+

The quiz experience must be excellent on mobile.

Avoid horizontal scrolling.

Question options must be easy to tap.

Minimum comfortable touch target:

~44px.

---

# 22. PAGE STRUCTURE

Recommended routes:

/

Tests:
/tests

Test type:
/tests/verbal
/tests/non-verbal
/tests/academic

Modules:
/tests/verbal/modules
/tests/non-verbal/modules
/tests/academic/modules

Quiz:
/quiz/[type]/[module]

Result:
/quiz/[type]/[module]/result

Review:
/quiz/[type]/[module]/review

Future:

/progress
/bookmarks
/mistakes
/profile
/admin

Do not create unnecessary routes.

---

# 23. COMPONENT ARCHITECTURE

Prefer reusable components.

Example:

components/
├── layout/
│   ├── Navbar
│   └── Footer
│
├── tests/
│   ├── TestTypeCard
│   ├── ModuleCard
│   └── ModuleGrid
│
├── quiz/
│   ├── QuizEngine
│   ├── QuizHeader
│   ├── Timer
│   ├── QuestionCard
│   ├── AnswerOption
│   ├── QuestionNavigator
│   ├── QuizNavigation
│   ├── SubmitDialog
│   └── ProgressIndicator
│
├── results/
│   ├── ResultSummary
│   ├── AnalyticsCard
│   ├── PerformanceBreakdown
│   ├── QuestionReview
│   └── WrongQuestionList
│
└── ui/
    ├── Button
    ├── Card
    ├── Badge
    ├── Modal
    └── ProgressBar

Adjust according to the existing project structure.

Do not create duplicate components with slightly different names.

---

# 24. DATA ARCHITECTURE

Separate:

DATA
QUIZ LOGIC
UI
CONFIGURATION

Do not put huge question arrays inside React components.

Question data belongs in:

@/data

Quiz configuration belongs in a dedicated configuration location.

Example conceptual configuration:

const quizConfig = {
  verbal: {
    questionsPerModule: 84,
    durationMinutes: 30
  },

  nonVerbal: {
    questionsPerModule: 64,
    durationMinutes: 30
  },

  academic: {
    questionsPerModule: 50,
    durationMinutes: 30
  }
};

---

# 25. MODULE DATA

Modules should be generated from available question data.

Do not duplicate arrays simply because the UI has Module 1, Module 2, etc.

Create a utility that divides question banks into modules according to the configured module size.

For example:

84 questions → one verbal module

50 questions → one academic module

64 questions → one non-verbal module

When additional question arrays are added, they can become additional modules.

---

# 26. ACADEMIC DATA

Academic data is spread across multiple files.

Inspect the actual arrays before implementation.

Combine/normalize academic question sources through a data layer.

Do not blindly concatenate files if that causes duplicate IDs or unexpected module behavior.

Create stable IDs where necessary.

---

# 27. NON-VERBAL PLACEHOLDER

Non-verbal is not ready yet.

Still build:

- Test card
- Module cards
- Timer
- Quiz engine integration
- Image question renderer
- Image option renderer
- Result page

Use a small clearly marked placeholder dataset only for development.

Do not present placeholder questions as real PMA questions.

Make replacing the placeholder data later require only a data-file change.

---

# 28. STATE MANAGEMENT

Prefer the simplest solution.

Do not install Redux/Zustand/etc. unless the existing project genuinely requires it.

For active quiz state, React state/context or a lightweight local solution is preferred.

Quiz state should include:

- current question
- selected answers
- timer/end timestamp
- question list
- startedAt
- completedAt

---

# 29. PERSISTENCE

If authentication/backend is not implemented yet, keep the quiz engine functional without requiring a backend.

For temporary client-side persistence, localStorage can be used carefully.

Do not make localStorage the permanent data architecture.

The architecture should allow future backend persistence.

Future user progress can store:

- completed modules
- scores
- attempts
- wrong questions
- bookmarks
- timestamps

---

# 30. ACCESSIBILITY

Must support:

- Keyboard navigation where practical
- Visible focus states
- Sufficient contrast
- Semantic buttons
- Accessible labels
- Do not rely only on color
- Proper image alt text
- Clear disabled states

---

# 31. PERFORMANCE

This is a Next.js application.

Prioritize:

- Server Components where appropriate
- Client Components only where interaction requires them
- Lazy loading where appropriate
- Optimized images
- Minimal dependencies
- No unnecessary client-side JavaScript
- Avoid rendering hundreds of heavy components unnecessarily

The quiz interaction itself will be client-side.

---

# 32. ANIMATIONS

Use subtle animations only.

Good:

- Card hover
- Button transition
- Question transition
- Result appearance
- Progress animation

Avoid:

- Large page transitions
- Constant motion
- Distracting animations during tests

Animations must never interfere with answering questions.

---

# 33. ERROR HANDLING

Handle:

- Missing question data
- Invalid module
- Invalid question index
- Empty question arrays
- Missing images
- Corrupt localStorage state
- Timer state issues

Never allow a malformed question to crash the entire application.

---

# 34. SECURITY

Never trust client-provided correct answers for future server-side scoring.

For the current static/local quiz architecture this is acceptable for practice.

When backend scoring is implemented later:

- Correct answers must remain server-side where appropriate
- Validate submissions
- Prevent trivial answer extraction
- Validate module IDs and question IDs

---

# 35. CODE QUALITY

Use TypeScript.

Prefer:

- Small components
- Clear names
- Reusable utilities
- Strong types
- No `any` unless absolutely necessary
- No duplicated quiz logic
- No duplicated styling
- No magic numbers

Use constants/configuration for:

- Test durations
- Question counts
- Test types
- Routes
- Status values

---

# 36. IMPORTANT DEVELOPMENT RULE

Before changing existing code:

1. Inspect the repository.
2. Inspect package.json.
3. Inspect Next.js version.
4. Inspect Tailwind version.
5. Inspect existing layout.
6. Inspect existing globals.css.
7. Inspect existing components.
8. Inspect all relevant @/data files.
9. Understand the existing MCQ interface.
10. Then implement.

Do not overwrite working project files blindly.

---

# 37. DO NOT

Do NOT:

- Rewrite existing question banks
- Invent PMA facts/questions
- Delete existing functionality
- Replace the project's architecture without reason
- Add unnecessary libraries
- Add unnecessary animations
- Build a generic LMS
- Build a blog
- Add unrelated features
- Use fake statistics
- Claim placeholder questions are real
- Hardcode Module 1/2/3 separately
- Duplicate quiz engines
- Put all application logic into one page

---

# 38. IMPLEMENTATION PRIORITY

Priority order:

P0:
Quiz engine
Timer
Question rendering
Answer selection
Submission
Results

P1:
Test type selection
Module system
Question navigation
Question review
Analytics

P2:
Responsive/mobile UI
Persistence
Progress

P3:
Advanced user features
Admin
Backend
Authentication

Do not work on P3 before P0/P1 is stable.

---

# 39. DEFINITION OF DONE

A phase is complete only when:

- Code builds successfully
- TypeScript has no relevant errors
- Existing question data still works
- Quiz can start
- Answers can be selected
- Navigation works
- Timer works
- Automatic submission works
- Manual submission works
- Results are accurate
- Wrong/correct questions are reviewable
- Mobile layout works
- No obvious console errors

After each phase, run the appropriate lint/typecheck/build/test commands and fix issues before moving to the next phase.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
