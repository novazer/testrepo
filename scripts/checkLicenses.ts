// Fails when an installed package carries a licence outside the allow-list.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ALLOWED = new Set([
  'MIT',
  'ISC',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  '0BSD',
  'BlueOak-1.0.0',
  'CC0-1.0',
  'Python-2.0',
  'CC-BY-4.0',
]);

function packageDirs(root: string): string[] {
  if (!existsSync(root)) return [];
  return readdirSync(root).flatMap((name) => {
    if (name.startsWith('.')) return [];
    if (name.startsWith('@')) return readdirSync(join(root, name)).map((sub) => join(root, name, sub));
    return [join(root, name)];
  });
}

const violations: string[] = [];
let count = 0;
for (const dir of packageDirs('node_modules')) {
  const manifest = join(dir, 'package.json');
  if (!existsSync(manifest)) continue;
  const { name, license } = JSON.parse(readFileSync(manifest, 'utf8')) as { name?: string; license?: string };
  count++;
  const ids = String(license ?? 'UNKNOWN')
    .replace(/[()]/g, '')
    .split(/\s+OR\s+/);
  if (!ids.some((id) => ALLOWED.has(id.trim()))) violations.push(`${name}: ${license ?? 'UNKNOWN'}`);
}

if (violations.length > 0) {
  console.error(`Licences outside the allow-list:\n${violations.join('\n')}`);
  process.exit(1);
}
console.log(`${count} packages checked, all licences allowed.`);
