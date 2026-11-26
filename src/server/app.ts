import { createServer, type Server } from 'node:http';
import { greet } from 'src/common/greeting.ts';

export const HEADING_COLOR = '#008000';

export function createApp(): Server {
  return createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    if (url.pathname === '/api/hello') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ message: greet() }));
      return;
    }
    if (url.pathname === '/') {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(
        `<!doctype html><title>Hello</title><style>h1,h2,h3,h4,h5,h6{color:${HEADING_COLOR}}</style><h1>${greet()}</h1>`,
      );
      return;
    }
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
  });
}
