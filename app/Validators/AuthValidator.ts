import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class RegisterValidator {
  public schema = schema.create({
    username: schema.string({ trim: true }, [rules.maxLength(50)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
    role: schema.string.optional({ trim: true }),
  })

  public messages = {
    'email.unique': 'This email is already registered.',
    'email.email': 'Please provide a valid email address.',
    'required': 'The {{ field }} field is required.',
  }
}

export class LoginValidator {
  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string(),
  })

  public messages = {
    required: 'The {{ field }} field is required to log in.',
  }
}
