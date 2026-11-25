# Development Process (Factory PoC)

The process of the Digital Grid monorepo, with a software factory doing the first pass of every step.
Humans never start on an empty slate: they check out the branch an agent already worked on, test it,
improve it, and hand it back.

## Roles

| Role  | Who                        | In the factory                                                                          |
| ----- | -------------------------- | --------------------------------------------------------------------------------------- |
| PO    | product owner team         | triages the Inbox, answers `Specification Request`, approves plans, accepts after merge |
| DEV   | developer team             | takes over agent branches, pushes improvements, hands back with a PR comment            |
| PEER  | another DEV                | reviews ready PRs; reviewers add themselves                                             |
| Agent | the factory's coding agent | plans, implements, answers review comments, keeps CI green                              |

## Board lanes and factory phases

| Board lane                  | Who acts                                                                                   | Factory phase                |
| --------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| `Inbox`                     | PO triages: Priority, Effort, Management Summary complete                                  | card waits in `Intake`       |
| `Product Backlog`           | PO sorts by priority                                                                       | card waits in `Intake`       |
| `Sprint Backlog`            | **intake:** moving an issue here hands it to the factory (the bridge sets `factory:ready`) | `Planning` starts on its own |
| `In Progress`               | agent builds; DEV takes over, improves, hands back                                         | `Building`, then `Review`    |
| `To be tested by PQSYS`     | PO accepts on QA after the merge                                                           | `Done`                       |
| `Done this sprint` / `Done` | release                                                                                    | `Done`                       |

GitHub moves an issue to `In Progress` when a PR links it, and to `To be tested by PQSYS` when that PR is
merged (project workflows).

## Steps

1. **Issue.** A ticket issuer creates the issue from an issue form. It starts with a Management Summary and a
   justified priority proposal ([Issue triage](issue_triage.md)). It lands in `Inbox`.
2. **Triage.** The PO sets `Priority` and `Effort` and moves the issue to `Product Backlog`, `Sprint Backlog`,
   `Later`, or closes it with a reason.
3. **Intake.** Moving an issue to `Sprint Backlog` hands it to the factory. The agent reads the issue and the
   repository, asks open questions on the issue with the label `Specification Request`, and posts a plan.
4. **Plan approval (human).** A DEV or the PO approves the plan in the factory, or asks for a revision.
5. **Implementation (agent).** The agent creates `dev-<issue>-<topic>`, the branch document, the code and tests,
   and opens a draft PR that closes the issue. CI runs the code checks, unit tests, licence check, the image
   build with a simulated preview deployment, and the `PR process` check.
6. **Take-over (human).** A DEV checks out the branch, tests the preview, pushes improvements, and leaves PR
   comments for what the agent should do next. The agent picks up the comments and the new commits.
7. **Ready for review.** When CI is green and the description holds the self-check and "How to verify", the
   PR leaves draft. A PEER adds themself as reviewer, reviews, and approves or requests changes; the agent
   answers review comments, the reviewer resolves their threads ([Review process](review_process.md)).
8. **Merge (human).** After approval and with every thread resolved, a DEV merges. The issue moves to
   `To be tested by PQSYS`, where the PO accepts it.

## Rules that keep humans in the loop

- `master` is protected: a PR, one approval, and the checks `Code checks`, `Unit tests`, `License check`,
  `Build Packages` and `PR process` are required. Agents can never merge.
- Agents never request reviewers and never resolve a reviewer's thread.
- A `Specification Request` stops the agent until the PO answers and removes the label.
- The label `business-review-required` makes the merge wait for a PO approval.
