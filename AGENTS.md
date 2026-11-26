# Agent Guidelines for testrepo

This repository mirrors the conventions of the Digital Grid monorepo on a hello-world app, so the
software factory proof of concept runs against the same process. Agents and humans follow the same rules.

## Project quick facts

- Node 24, TypeScript, Yarn 4 (`corepack enable`). Default branch: `master`. CI: GitHub Actions.
- Board: GitHub Project `Digital Grid (Factory PoC)` (novazer project 3).
- Absolute imports from the repository root are mandatory (`src/common/greeting.ts`), never relative imports.

## Process

- Read `docs/development/process.md` first. It defines the stages (Idee → Spezifikation → Bereit → Planung →
  Umsetzung → Review → Abnahme), the human gates, and the `stage:*` labels.
- Work only in the stage your card is in: specify in `Spezifikation`, plan in `Planung`, implement in `Umsetzung`.
- A task (label `split:task`) is one sub-issue of a spec ticket. Read the spec ticket it names for context,
  then plan and implement only this task; never create, split or close sub-issues yourself.
- Never start implementation without a spec the PO approved (Management Summary, acceptance criteria,
  `Priority`, `Effort`). Ask specification questions on the issue with the label `Specification Request` and stop.
- Never commit to `master`. Work on `dev-<issue>-<short-topic>`, for example `dev-12-health-endpoint`.
- Every branch has a branch document `docs/branch-docs/<branch>.md` (`docs/development/branch_documents.md`).
- Every PR links its issue: `Closes #123`, or `Part of #123: reason` for a small technical change.
- Open the PR as a draft; mark it ready (`gh pr ready`) when CI is green and the description holds the
  self-check and "How to verify". Never assign or request reviewers.
- A human may push commits to your branch at any time. Pull before you continue, keep their commits, never
  force-push a branch under review.
- Stuck (CI red three times, a missing permission such as workflow files, an unclear requirement): push what
  you have, comment exactly what a human must do, add the label `stage:hilfe` and stop.
- Visible UI changes: recommend `business-review-required` in the spec; the PO decides.

## Code expectations

- Make minimal, focused changes; reuse existing helpers.
- Code comments state only what the code cannot, in one or two lines; reasons go to the branch document.
- Before handing over, run `yarn check` (typecheck, format, tests) and `yarn check:licenses`.
- Add a unit test next to the code for every behaviour change (`*.test.ts`).
- No new dependency without a reason in the branch document; the `License check` job enforces the allow-list.

## Writing style

Be concise. Lead with the result. Issues use the German issue forms; branch documents and PR descriptions
are English.
