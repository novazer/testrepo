# dev-9-ai-lifecycle

## Goal

Describe the AI software factory process in the repository so agents and humans follow the same stages and gates.

## Tickets

- #9

## Scope

Process documentation, issue forms (new "Idee" form; feature and task forms removed), `AGENTS.md`, triage rules.
Factory and bridge configuration live outside the repository.

## Decisions

- Kanban with WIP limits replaces sprint commitments; review capacity sets the pace (Christian Gahlert, 2026-11-25).
- The spec is written into the issue body; the original idea stays verbatim at the end (Christian Gahlert, 2026-11-25).
- Plans of issues with Effort Low and without `risk:high` are approved automatically (`plan:auto`) (Christian Gahlert, 2026-11-25).
- Specs and ideas in German; plans, code, PRs and branch documents in English (Christian Gahlert, 2026-11-25).
- Workflow files stay human-only; the App has no `workflows` permission.

## Alternatives Considered

- Mirroring the old Inbox/Backlog/Sprint lanes 1:1: rejected, it leaves no place for agent work before implementation.

## Verification

`yarn check`, `BRANCH_NAME=dev-9-ai-lifecycle yarn check:branch-doc`, CI.
