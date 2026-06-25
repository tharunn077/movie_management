import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {}

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    // VALIDATION FAILURES
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        status: 'fail',
        message: 'Validation failed. Please check your inputs.',
        errors: error.messages.errors,
      })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS' || error.status === 401) {
      return ctx.response.status(401).send({
        status: 'fail',
        error: 'Authentication failed. Missing or invalid token.',
      })
    }

    // ROUTE NOT FOUND ERROR
    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.status(404).send({
        status: 'error',
        error: 'Endpoint not found. Check your URL syntax and HTTP method.',
      })
    }
    Logger.error(error)

    return ctx.response.status(error.status || 500).send({
      status: 'error',
      message: 'An unexpected internal server error occurred.',
    })
  }
}
