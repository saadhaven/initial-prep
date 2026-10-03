# MCQ Data Cleanup and Quiz UX Refinement Prompt

You are working on the MCQ data stored in the TypeScript files under `@/data`.
Your task is to correct the question bank thoroughly and consistently according to the requirements below.

## Core Objective

Fix all MCQ files in `@/data` so that they are:
- factually correct
- grammatically clean
- logically consistent
- properly structured
- difficult to guess by pattern
- relevant and fair for exam-style practice

Do not rewrite or recreate the full question bank unnecessarily. Only correct and improve the existing data when needed.

## Mandatory Rules

1. Correct every incorrect question.
2. Correct every incorrect answer key.
3. Correct every misleading or confusing option.
4. Remove duplicate answer clues across options.
5. Ensure the correct answer is placed randomly in each question.
6. Keep exactly one correct option per question.
7. Make all distractors relevant to the question topic and same category of knowledge.
8. Avoid near-duplicate wording that makes different options feel like the same answer.
9. Remove irrelevant or confusing content.
10. Preserve the existing file structure and data format.
11. Do not add fake questions or invent facts.
12. Do not change the question bank into a completely different format.

## Common Quality Problems to Fix

### 1. Correct answer placement is predictable
Most correct answers are `A`.
This is a major issue because users can guess the answer.

Fix:
- Randomize the position of the correct option across all MCQs.
- Do not leave answer keys clustered in the same option letter.

### 2. Duplicate answer text in multiple options
If the same name, date, fact, or phrase appears in more than one option, it creates confusion.

Fix:
- Remove repeated names and repeated facts from distractors.
- Keep each option distinct and independent.

### 3. Irrelevant distractors
Some distractors are unrelated to the actual question being asked.

Fix:
- Every option should be about the same field or concept.
- Distractors should be plausible but wrong.

### 4. Options that are all variations of the same idea
If all options are just slight wording changes of the same fact, the question becomes unfair.

Fix:
- Distinct answer choices with different meanings or values.
- Ensure the correct option is clearly distinguishable.

### 5. Unclear question wording
Questions like date vs. length, place vs. person, event vs. year must be clearly specified.

Fix:
- Ask one specific thing only.
- Make the answer objective and unambiguous.

### 6. Wrong or weak factual content
If a question or statement is factually wrong, correct it.

Fix:
- Replace inaccurate facts with correct ones.
- Keep the educational intent of the question intact.

## Examples of the Problems to Correct

### Example 1: Predictable answer pattern
Incorrect pattern:
- A: Sir Syed Ahmed Khan
- B: 37 plays and 154 sonnets
- C: Sir Syed Ahmed Khan
- D: Stanley Wolpert

Problem:
- The correct answer appears twice.
- The distractor is irrelevant.
- The same name is repeated in multiple options.

Required fix:
- Ensure only one valid correct answer and no repeated key fact.
- Keep distractors relevant to the question and distinct from each other.

### Example 2: Duplicate answer clue
Question: 1999 Nishan-e-Haider holder

Incorrect:
- A: Havaldar Lalak Jan, Karnal Sher Khan
- B: Captain Raja Sarwar
- C: 15 July 1999 - Cargill War, Havaldar Lalak Jan
- D: Australia .2003.2007.1987

Problem:
- The same person appears twice in multiple options.
- Option C is not cleanly phrased.
- The distractors are not all in the same category.

Required fix:
- Remove repeated names.
- Use plausible but distinct distractors related to the same topic.
- Keep the answer wording clean and accurate.

### Example 3: Confusingly similar options
Question: When did Prophet Muhammad migrate to Madina?

Incorrect:
- A: 13 Nabvi, 622 AD
- B: 13 Nabvi 622
- C: 622 A D
- D: 13th Nabvi

Problem:
- All options are effectively variations of the same core idea.
- The user is forced to guess based on wording, not knowledge.

Required fix:
- Make the options clearly different in meaning and structure.
- Keep only one correct answer.

### Example 4: Irrelevant distractor wording
Question: Rohtas Fort is near?

Incorrect:
- A: Peshawar
- B: Jhelum
- C: Raincoat fort in Thatta
- D: Ranikot

Problem:
- Option C unnecessarily repeats another fort name and is not a relevant distractor.

Required fix:
- Use plausible nearby locations or relevant landmarks, not repeated fort names.

### Example 5: Irrelevant option set
Question: Uhud is a name of a mountain?

Incorrect:
- A: 3
- B: 700
- C: 3 Hijri
- D: Uhud means commitment

Problem:
- The options are unrelated to the question.
- One option is a statement about the meaning of the word, not a choice in the question.

Required fix:
- Rewrite the question to a valid MCQ about the concept if needed.
- Use culturally relevant and logically consistent options.

### Example 6: Mixed question types
Question: Pak-Iran gas pipeline agreement?

Incorrect:
- A: 800 km
- B: 16 March 2010
- C: 805 km
- D: 2 March 1963

Problem:
- The question is unclear because it mixes length and date in a single item.

Required fix:
- Ask one clear fact only, such as the agreement date or the pipeline length.
- Ensure the answer choices all belong to the same dimension.

## Additional Correction Expectations

- Fix spelling, punctuation, capitalization, and grammar.
- Correct names, dates, historical facts, and titles.
- Ensure options do not contain repeated keywords that reveal the correct answer.
- Standardize the wording of similar questions across files.
- Preserve educational accuracy and avoid introducing new misinformation.
- If a question is fundamentally bad, rewrite it as a valid MCQ without inventing unsupported content.

## UI/Quiz Behavior Requirements

In addition to fixing the question data, make the following application behavior changes:

1. On the last MCQ, there should be no confirmation popup before submission.
2. The final navigation button should become `Submit` instead of `Next`.
3. On the result page, if another module is available, show a direct option to go to the next module immediately.
4. The result screen should still allow review of wrong questions and all questions.

## Acceptance Criteria

The final dataset should satisfy all of the following:
- All answers have been verified or corrected.
- No option repeats the same key fact as the correct answer.
- Correct option letters are randomized.
- Distractors are relevant and plausible.
- Questions are clear, specific, and answerable.
- Only one correct answer exists per question.
- The question bank remains usable in the app without breaking the quiz flow.
- The quiz UX includes the last-question submit behavior and next-module navigation.

## Final Instruction

Work through every MCQ file in `@/data`, correct all issues, and make the quiz experience align with the requirements above. Do not leave obvious pattern-based guessing, duplicate facts, irrelevant distractors, or confusing question wording in the final dataset.




