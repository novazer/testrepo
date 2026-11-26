# dev-9-task-split

## Goal

Make the specification a task of its own that ends in a split into small, independently mergeable tasks, so that
every PR stays reviewable and devs decide task boundaries before any code exists.

## Tickets

- Part of #9: extends the AI lifecycle with the task split.

## Scope

`docs/development/process.md`, `docs/development/issue_triage.md`, `AGENTS.md`.

## Decisions

- The spec agent writes the split as `### Task-Schnitt` in the issue body; PO approves the content, a dev the split, by moving the issue to `Bereit` (2026-11-26).
- The board bridge, not an agent, creates the sub-issues, adds them to `Bereit`, parks the spec ticket in the new lane `In Tasks` and moves it to `Abnahme` when every task is closed. Deterministic code for bookkeeping, agents for judgement.
- A task pulled into `Planung` while a task it depends on is open goes back to `Bereit` with a comment.

## Alternatives Considered

- Letting the spec agent create sub-issues itself: rejected, it would create tickets before the dev approved the split.
- No split, one PR per spec: rejected, M+ specs produce PRs too big to review with confidence.

## Verification

CI on this PR. End-to-end run with a demo idea on the PoC board.
