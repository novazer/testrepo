// Fails when the branch has no branch document named after it (docs/development/branch_documents.md).
import { existsSync, readFileSync } from 'node:fs';

const branch = process.env.BRANCH_NAME ?? process.argv[2];
if (!branch) {
  console.error('Pass the branch name as BRANCH_NAME or first argument.');
  process.exit(2);
}

const path = `docs/branch-docs/${branch.replaceAll('/', '--')}.md`;
if (!existsSync(path)) {
  console.error(`Missing branch document ${path}.`);
  process.exit(1);
}

const text = readFileSync(path, 'utf8');
const missing = ['## Goal', '## Tickets', '## Scope', '## Decisions'].filter((heading) => !text.includes(heading));
if (!text.startsWith(`# ${branch}\n`) || missing.length > 0) {
  console.error(`${path} needs the title "# ${branch}" and the sections ${missing.join(', ') || '(ok)'}.`);
  process.exit(1);
}
console.log(`Branch document ${path} is present.`);
