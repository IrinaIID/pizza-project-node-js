import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { AppError } from './errors.js';

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: 'Validation error',
        code: 'ZOD_ERROR',
        details: error.issues,
      });
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.message,
        code: error.code,
      });
    }

    return reply.status(500).send({
      error: 'Internal Server Error',
      code: 'INTERNAL_ERROR',
    });
  });
}
