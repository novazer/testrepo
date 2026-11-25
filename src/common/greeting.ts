export const DEFAULT_NAME = 'World';

export function greet(name?: string): string {
  const trimmed = name?.trim();
  return `Hello, ${trimmed ? trimmed : DEFAULT_NAME}!`;
}
