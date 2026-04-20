import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyRequest } from 'fastify';
import { z } from 'zod';
import { errorHandler } from './error-handler.js';

describe('errorHandler', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify();

    await errorHandler(app);

    app.post('/zod-error', async (request: FastifyRequest) => {
      const schema = z.object({
        name: z.string(),
      });

      schema.parse(request.body);
      return { ok: true };
    });

    app.get('/server-error', async () => {
      throw new Error('Something went wrong');
    });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 400 for ZodError', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/zod-error',
      payload: {},
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({
      error: 'Validation error',
      details: expect.any(String),
    });
  });

  it('should return 500 for generic error', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/server-error',
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({
      error: 'Internal Server Error',
    });
  });
});
