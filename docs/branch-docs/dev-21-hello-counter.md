# dev-21-hello-counter

## Goal

Count calls to `/api/hello` and expose the count at `GET /api/hello/count`.

## Tickets

- Closes #21
- Part of #19

## Scope

`src/server/app.ts` and its tests. No persistence, no UI change.

## Decisions

- The counter lives inside `createApp()`, not at module level, so each server (and each test) starts at 0 and a restart resets it.
- Exact path matching keeps `/`, the count endpoint and 404 paths from counting.

## Alternatives Considered

- Module-level counter: rejected, leaks state between tests.

## Verification

`yarn check` and `yarn check:licenses`; manually `curl /api/hello/count`, `curl /api/hello`, `curl /api/hello/count`.
