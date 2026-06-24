import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class JwtAuth {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    const authHeader = request.header('Authorization')

    if (!authHeader) {
      return response.status(401).json({ error: 'Missing Authorization header' })
    }
    
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return response.status(401).json({ error: 'Invalid token format' })
    }

    const token = parts[1]

   try {
      const secretKey = Env.get('APP_KEY')
      const decodedPayload = jwt.verify(token, secretKey) as any
      
      if (decodedPayload.role !== 'admin') {
        return response.status(403).json({ error: 'Forbidden: Admin access required' })
      }
    } catch (error) {
      return response.status(401).json({ error: 'Invalid or expired token' })
    }
    await next()
  }
}