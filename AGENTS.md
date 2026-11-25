# Agent Guidelines for testrepo

This repository mirrors the conventions of the Digital Grid monorepo on a hello-world app, so the
software factory proof of concept runs against the same process. Agents and humans follow the same rules.

## Project quick facts

- Node 24, TypeScript, Yarn 4 (`corepack enable`). Default branch: `master`. CI: GitHub Actions.
- Board: GitHub Project `Digital Grid (Factory PoC)` (novazer project 3).
- Absolute imports from the repository root are mandatory (`src/common/greeting.ts`), never relative imports.

## Process

- Read `docs/development/process.md` before starting. It maps every board lane to the factory phase that
  works on it and names the human hand-over points.
- Every PR links an issue: `Closes #123`, or `Part of #123: reason` for a small technical change
  (`docs/development/issue_triage.md`). Never start implementation without a triage-complete issue.
- Ask specification questions on the issue and set the label `Specification Request`; stop and wait for the
  PO's answer instead of guessing.
- Never commit to `master`. Work on `dev-<issue>-<short-topic>`, for example `dev-12-health-endpoint`.
- Every branch has a branch document `docs/branch-docs/<branch>.md` (`docs/development/branch_documents.md`).
  The `PR process` check fails without it.
- Open the PR as a draft. Mark it ready only when CI is green and the description holds the self-check and
  the steps under "How to verify" (`docs/development/review_process.md`).
- Never assign or request a reviewer. Reviewers add themselves.
- A human may push commits to your branch at any time. Always `git pull --rebase` before you continue, keep
  their commits, and never force-push a branch under review.
- When a change visibly reworks the UI, say so in the PR; the PO decides on the label `business-review-required`.

## Code expectations

- Make minimal, focused changes; reuse existing helpers.
- Code comments state only what the code cannot, in one or two lines; reasons go to the branch document.
- Before handing over, run `yarn check` (typecheck, format, tests) and `yarn check:licenses`.
- Add a unit test next to the code for every behaviour change (`*.test.ts`).
- No new dependency without a reason in the branch document; the `License check` job enforces the allow-list.

## Writing style

Be concise. Lead with the result. Issues use the German issue forms; branch documents and PR descriptions
are English.
