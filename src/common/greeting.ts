export const DEFAULT_NAME = 'World';

export function greet(name?: string): string {
  const trimmed = name?.trim();
  return `Same, ${trimmed ? trimmed : DEFAULT_NAME}! Low key swag to see you.`;
}
