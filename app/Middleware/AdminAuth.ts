import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminAuth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const secretKey = request.header('admin-key')
    if (secretKey !== 'super-secret') {
      return response.status(401).json({
        error: 'Unauthorized',
        message: 'You do not have the admin clearance required to delete movies.'
      })
    }
    await next()
  }
}