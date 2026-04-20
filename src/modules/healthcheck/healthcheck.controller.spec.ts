import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify from 'fastify';
import { HealthCheckController } from './healthcheck.controller.js';

describe('HealthCheckController', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify();
    await app.register(HealthCheckController);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 and OK', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/healthcheck',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('OK');
  });
});
