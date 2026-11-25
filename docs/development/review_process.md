# Review Process

- **Draft** while the author (agent or DEV) works on it. **Ready** when it is no draft, CI is green, and the
  description holds the self-check and "How to verify".
- Reviewers add themselves; nobody requests or assigns reviewers on someone else's behalf.
- The reviewer resolves their own threads. The author answers each thread with what changed (commit link) or why
  not; the author never resolves a reviewer's thread.
- No history rewrites during a review: no force-push, no squash of pushed commits. Add commits.
- Merge only after approval and with every thread resolved, preferably with auto-merge.
- A PR with the label `business-review-required` additionally needs a PO approval.
