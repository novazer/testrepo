import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp, HEADING_COLOR } from 'src/server/app.ts';

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

  it('colors all headings on / in the heading color', async () => {
    const html = await (await fetch(baseUrl)).text();
    expect(HEADING_COLOR).toBe('#008000');
    expect(html).toContain(`h1,h2,h3,h4,h5,h6{color:${HEADING_COLOR}}`);
    expect(html).toContain('<h1>');
  });

  it('answers unknown paths with 404', async () => {
    expect((await fetch(`${baseUrl}/nope`)).status).toBe(404);
  });
});
