import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import { RegisterValidator, LoginValidator } from 'App/Validators/AuthValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const validatedData = await request.validate(RegisterValidator)

      const user = User.create(validatedData)

      return response.created({
        message: 'User created successfully',
        user,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Failed to register user.',
        error: error.messages || error.message,
      })
    }
  }

  public async login({ request, response }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(LoginValidator)

      const user = await User.findBy('email', email)

      if (!user || user.password !== password) {
        return response.unauthorized({
          error: 'Invalid email or password',
        })
      }

      const payload = {
        userId: user.id,
        username: user.username,
        role: user.role,
      }

      const token = jwt.sign(payload, Env.get('APP_KEY'))

      return response.ok({
        message: 'Login successful',
        token,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Failed to login.',
        error: error.messages || error.message,
      })
    }
  }
}