import { describe, expect, it } from 'vitest';
import { greet } from 'src/common/greeting.ts';

describe('greet', () => {
  it('greets the world by default', () => {
    expect(greet()).toBe('Hello, World!');
  });

  it('ignores a blank name', () => {
    expect(greet('   ')).toBe('Hello, World!');
  });
});
