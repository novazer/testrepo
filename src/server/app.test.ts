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
    expect(await response.json()).toEqual({ message: 'Same, World! Low key swag to see you.' });
  });

  it('answers unknown paths with 404', async () => {
    expect((await fetch(`${baseUrl}/nope`)).status).toBe(404);
  });
});

describe('hello counter', () => {
  const counterServer = createApp();
  let counterUrl = '';

  beforeAll(async () => {
    await new Promise<void>((resolve) => counterServer.listen(0, resolve));
    counterUrl = `http://localhost:${(counterServer.address() as AddressInfo).port}`;
  });

  afterAll(() => new Promise<void>((resolve) => counterServer.close(() => resolve())));

  const count = async () => (await (await fetch(`${counterUrl}/api/hello/count`)).json()).count;

  it('starts at 0 and counts every /api/hello call', async () => {
    expect(await count()).toBe(0);
    await fetch(`${counterUrl}/api/hello`);
    expect(await count()).toBe(1);
    await fetch(`${counterUrl}/api/hello`);
    expect(await count()).toBe(2);
  });

  it('answers the count endpoint with JSON and does not change the count', async () => {
    const response = await fetch(`${counterUrl}/api/hello/count`);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/json');
    expect(await count()).toBe(2);
  });

  it('ignores other paths', async () => {
    await fetch(`${counterUrl}/`);
    expect((await fetch(`${counterUrl}/nope`)).status).toBe(404);
    expect(await count()).toBe(2);
  });

  it('starts at 0 again for a new server', async () => {
    const fresh = createApp();
    await new Promise<void>((resolve) => fresh.listen(0, resolve));
    const url = `http://localhost:${(fresh.address() as AddressInfo).port}`;
    expect(await (await fetch(`${url}/api/hello/count`)).json()).toEqual({ count: 0 });
    await new Promise<void>((resolve) => fresh.close(() => resolve()));
  });
});
