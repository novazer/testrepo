# Development Process (AI Software Factory)

Work comes in two kinds of tickets. The **spec ticket** is a task of its own: an idea becomes a specification
and, when it is bigger than one change, a split into **tasks**. Every task becomes a sub-issue and runs through
planning, implementation and review on its own, so every PR stays small. Agents do the first pass of
specification, split, planning and implementation; humans decide at three gates: **spec and split approval**,
**code review** and **acceptance**. Nobody starts on an empty slate: a human always finds a spec, a split, a plan
or a branch to judge or improve.

## Stages

| Board lane = Factory phase | Who works                                                                                                                                                                                                                          | Exit gate                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `Idee`                     | anyone, form "Idee" (two or three sentences)                                                                                                                                                                                       | PO pulls the idea into `Spezifikation`                                                                                           |
| `Spezifikation`            | agent (`factory-spec`): Management Summary, Given/When/Then acceptance criteria, out of scope, duplicates, priority and effort proposal, task split (`### Task-Schnitt`); open questions go to the PO with `Specification Request` | **PO approves the content, a dev the split** (Definition of Ready), PO sets `Priority` and `Effort`, moves the issue to `Bereit` |
| `Bereit`                   | a spec with a task split: the bridge creates one sub-issue per task here and parks the spec ticket in `In Tasks`. PO keeps the lane sorted by priority                                                                             | the team pulls the top issue or task into `Planung` when a WIP slot is free; a task whose dependencies are open goes back        |
| `Planung`                  | agent (`factory-plan`): implementation plan with files, tests, risks, size check                                                                                                                                                   | **Dev approves the plan** in Factory. `plan:auto` (Effort Low, no `risk:high`) approves it on its own                            |
| `Umsetzung`                | agent (`factory-build`), autonomous: branch, code, tests, branch document, draft PR, CI green, then ready for review                                                                                                               | automatic when the PR leaves draft                                                                                               |
| `Hilfe nötig`              | a dev takes over the branch the agent left, does what it asked for, and moves the issue back to `Umsetzung`                                                                                                                        | dev hands back                                                                                                                   |
| `Review`                   | dev reviews and tests the preview; the agent answers review comments and picks up pushed commits                                                                                                                                   | **approval and merge by a human**                                                                                                |
| `In Tasks`                 | nobody: the spec ticket waits while its tasks run; GitHub shows their progress on it                                                                                                                                               | automatic when every task is closed: the spec ticket moves to `Abnahme`, closed tasks to `Done`                                  |
| `Abnahme`                  | PO tests on QA, for a split spec once for all tasks; the agent provides test notes                                                                                                                                                 | PO moves the issue to `Done`                                                                                                     |

`Later` holds consciously deferred ideas.

## Gates and labels

- Humans move issues on the board. The board bridge mirrors the lane into a `stage:*` label, and Factory moves
  its card to the matching phase. Agents signal back the same way: `stage:hilfe` moves the lane to `Hilfe nötig`.
- `Specification Request`: the agent stops until the PO answers and removes the label.
- Task split: needed from effort M or when the work holds more than one independently mergeable change. Every
  task is mergeable alone, at most effort M, and carries its acceptance criteria from the spec. Dependencies
  (`Abhängig von: #n`) decide the order: the bridge sends a task back to `Bereit` while one is still open.
- `split:parent` and `split:task`: set by the bridge on the spec ticket and its tasks; nobody sets them by hand.
- `plan:auto`: set by the bridge for Effort `Low` without `risk:high`; Factory approves such plans on its own.
- `risk:high`: forces a human plan approval regardless of size (security, data migration, public API).
- `business-review-required`: the merge additionally waits for a PO approval (visible UX changes).
- `master` is protected: PR, one approval, all checks green, every thread resolved. Agents can never merge.
- Workflow files (`.github/workflows/`) can only be changed by humans; agents escalate with `stage:hilfe`.
- Branches are named `dev-<issue>-<topic>`; the `PR process` check rejects other names, including the factory's
  default `factory/issue-<n>-<hash>`.
- Factory phases start only with their `stage:*` label and never while `Specification Request` is set, so moving a
  card in the Factory UI cannot skip the board gates.

## Team cycle

- **Kanban with WIP limits** instead of sprint commitments. Review is the bottleneck: at most 3 issues in
  `Review` and 2 in `Hilfe nötig`; agents do not start new plans while review is full.
- **Roles**
  - PO: owns `Idee` → `Bereit` (spec approval) and `Abnahme`.
  - Developers: approve plans, take over `Hilfe nötig`, review.
  - Factory operator (rotates weekly): watches stuck cards and failed runs, keeps skills and `AGENTS.md` current.
- **Rhythm**
  - Daily: empty the human queues first (plans to approve, `Hilfe nötig`, `Review`), then pull new work.
  - Weekly, 30 minutes: spec round (PO + one dev) over `Idee` and `Spezifikation`.
  - Weekly, 30 minutes: factory retro with the numbers below; every recurring review finding becomes a rule in
    `AGENTS.md` or a skill ("fix the factory, not only the product").
- **Numbers**: lead time per stage, share of issues merged without `Hilfe nötig`, review rounds per PR,
  questions per spec, rework after acceptance.

## Release

Unchanged: the PO declares a code freeze, accepts the issues in `Abnahme`, and a release is cut from `master`.
