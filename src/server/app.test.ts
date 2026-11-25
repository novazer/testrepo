import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from 'src/server/app.ts';

const server = createApp();
let baseUrl = '';

beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, resolve));
  baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
});

afterAll(() => new Promise<void>((resolve) => server.close(() => resolve())));

describe('app', () => {
  it('answers /api/hello with a greeting', async () => {
    const response = await fetch(`${baseUrl}/api/hello`);
    expect(await response.json()).toEqual({ message: 'Hello, World!' });
  });

  it('answers unknown paths with 404', async () => {
    expect((await fetch(`${baseUrl}/nope`)).status).toBe(404);
  });
});
