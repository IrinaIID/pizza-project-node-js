import { describe, it, expect } from 'vitest';
import { HealthCheckService } from './healthcheck.service.js';

describe('HealthCheckService', () => {
  it('should return OK', () => {
    const service = new HealthCheckService();
    const status = service.getStatus();

    expect(status).toBe('OK');
  });
});
