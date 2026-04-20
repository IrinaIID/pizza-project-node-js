import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: 'Validation error',
        details: error.message
      })
    }

    request.log.error(error)

    return reply.status(500).send({
      error: 'Internal Server Error'
    })
  })
}