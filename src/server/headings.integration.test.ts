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

describe('heading color over HTTP', () => {
  it('serves / as HTML with a green rule for every heading level', async () => {
    const response = await fetch(baseUrl);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/html');
    const html = await response.text();
    const rule = /<style>([^<]*)<\/style>/.exec(html)?.[1] ?? '';
    for (const level of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
      expect(rule.split('{')[0].split(',')).toContain(level);
    }
    expect(rule).toContain('color:#008000');
  });

  it('leaves /api/hello as plain JSON without styles', async () => {
    const response = await fetch(`${baseUrl}/api/hello`);
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(JSON.stringify(await response.json())).not.toContain('<style>');
  });

  it('does not add styles to the 404 response', async () => {
    const response = await fetch(`${baseUrl}/nope`);
    expect(response.status).toBe(404);
    expect(await response.text()).not.toContain('<style>');
  });
});
