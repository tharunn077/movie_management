import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class GetMoviesValidator {
  constructor(protected ctx: HttpContextContract) {}

  public data = {
    page: Number(this.ctx.request.input('page') ?? 1),
    limit: Number(this.ctx.request.input('limit') ?? 10),
  }

  public schema = schema.create({
    limit: schema.number([rules.range(1, 100)]),
    page: schema.number([rules.range(1, 10000)]),
  })

  public messages = {
    'limit.range': 'The requested limit must be a number between 1 and 100.',
    'limit.number': 'The limit parameter must be a valid number.',
    'page.range': 'The page number must be greater than 0.',
    'page.number': 'The page parameter must be a valid number.',
  }
}

export class MovieValidator {
  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(100)]),
    director: schema.string({ trim: true }, [rules.maxLength(35)]),
    releaseYear: schema.number([rules.range(1888, 2030)]),
    imdbRating: schema.number([rules.range(0, 10)]),
  })

  public messages = {
    'title.required': 'A movie title is strictly required.',
    'director.required': 'A movie director is strictly required.',
    'releaseYear.range': 'The release year must be between 1888 and 2030.',
    'imdbRating.range': 'IMDb ratings must be on a scale from 0 to 10.',
  }
}

export class UpdateMovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public data = {
    ...this.ctx.request.body(),
    id: Number(this.ctx.params.id),
  }

  public schema = schema.create({
    id: schema.number(),
    title: schema.string({ trim: true }, [rules.maxLength(100)]),
    director: schema.string({ trim: true }, [rules.maxLength(35)]),
    releaseYear: schema.number([rules.range(1888, 2030)]),
    imdbRating: schema.number([rules.range(0, 10)]),
  })

  public messages = {
    'id.number': 'Movie ID must be a valid number.',
    'title.required': 'A movie title is required for a full update.',
    'director.required': 'A movie director is required for a full update.',
    'releaseYear.range': 'The release year must be between 1888 and 2030.',
    'imdbRating.range': 'IMDb ratings must be on a scale from 0 to 10.',
  }
}

export class DeleteMovieValidator {
  constructor(protected ctx: HttpContextContract) {}

  public data = this.ctx.params

  public schema = schema.create({
    id: schema.number(),
  })

  public messages = {
    'id.number': 'Movie ID must be a valid number.',
  }
}