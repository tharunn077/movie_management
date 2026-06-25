import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const method = request.method()
    const url = request.url()
    console.log(`[INBOUND] ${method} -> ${url}`)
    await next()
    const status = response.response.statusCode
    console.log(`[OUTBOUND] ${method} -> ${url} | Status: ${status}`)
  }
}
