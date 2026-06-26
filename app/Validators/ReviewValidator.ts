import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class GetReviewsValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.request.qs()

  public schema = schema.create({
    limit: schema.number.optional([rules.range(1, 100)]),
  })
}

export class CreateReviewValidator {
  public schema = schema.create({
    userId: schema.number(),
    movieId: schema.number(),
    rating: schema.number([rules.range(1, 5)]),
    comment: schema.string.optional({ trim: true }, [rules.maxLength(500)]),
  })
}

export class UpdateReviewValidator {
  constructor(protected ctx: HttpContextContract) {}

  public data = {
    ...this.ctx.request.body(),
    id: Number(this.ctx.params.id),
  }

  public schema = schema.create({
    id: schema.number(),
    rating: schema.number([rules.range(1, 5)]),
    comment: schema.string.optional({ trim: true }, [rules.maxLength(500)]),
  })

  public messages = {
    'id.number': 'Review ID must be a valid number.',
  }
}

export class DeleteReviewValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.params

  public schema = schema.create({
    id: schema.number(),
  })
}
