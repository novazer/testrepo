import { describe, expect, it } from 'vitest';
import { greet } from 'src/common/greeting.ts';

describe('greet', () => {
  it('greets the world by default', () => {
    expect(greet()).toBe('Same, World! Low key swag to see you.');
  });

  it('greets a given name, trimmed', () => {
    expect(greet('  Mia ')).toBe('Same, Mia! Low key swag to see you.');
  });

  it('ignores a blank name', () => {
    expect(greet('   ')).toBe('Same, World! Low key swag to see you.');
  });
});
