# dev-9-branch-name-check

## Goal

Enforce the `dev-<issue>-<topic>` branch convention and document that Factory phases cannot skip board gates.

## Tickets

- Part of #9: closes gaps found while testing #11.

## Scope

`PR process` check, `docs/development/process.md`.

## Decisions

- The `PR process` check rejects branch names other than `dev-<number>-<topic>`; #11's agent pushed Factory's default `factory/issue-11-<hash>` although its plan named a dev branch (2026-11-25).
- Factory phases Spezifikation, Planung and Umsetzung only start with their `stage:*` label and without `Specification Request` (Factory board setting, outside the repository).

## Alternatives Considered

- Accepting any branch name as the monorepo does: rejected for the PoC, the convention is what we want agents to follow.

## Verification

CI on this PR; a non-dev branch PR fails `PR process`.
