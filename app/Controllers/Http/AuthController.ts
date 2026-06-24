import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import { RegisterValidator, LoginValidator } from 'App/Validators/AuthValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(RegisterValidator)
    const user = await User.create(validatedData)
    
    return response.created({ message: 'User created successfully', user })
  }

  public async login({ request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    const user = await User.findBy('email', email)
    if (!user || user.password !== password) {
      return response.unauthorized({ error: 'Invalid email or password' })
    }
    const payload = { userId: user.id, username: user.username, role: user.role }
    const token = jwt.sign(payload, Env.get('APP_KEY'))

    return response.ok({ message: 'Login successful', token })
  }
}