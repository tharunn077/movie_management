import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// 1. GET VALIDATOR
export class GetMoviesValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.request.qs()
  public schema = schema.create({
   limit: schema.number.optional([rules.range(1, 100)]),
    page: schema.number.optional([rules.range(1, 10000)]),
  })

  public messages = {
    'limit.range': 'The requested limit must be a number between 1 and 100.',
    'limit.number': 'The limit parameter must be a valid number.',
    'page.range': 'The page number must be greater than 0.',
    'page.number': 'The page parameter must be a valid number.',
  }
}

// 2. POST VALIDATOR
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

// 3. PUT VALIDATOR
export class UpdateMovieValidator {
  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(100)]),
    director: schema.string({ trim: true }, [rules.maxLength(35)]),
    releaseYear: schema.number([rules.range(1888, 2030)]),
    imdbRating: schema.number([rules.range(0, 10)]),
  })

  public messages = {
    'title.required': 'A movie title is required for a full update.',
    'director.required': 'A movie director is required for a full update.',
    'releaseYear.range': 'The release year must be between 1888 and 2030.',
    'imdbRating.range': 'IMDb ratings must be on a scale from 0 to 10.',
  }
}

// 4. DELETE VALIDATOR
export class DeleteMovieValidator {
  constructor(protected ctx: HttpContextContract) {}
  public data = this.ctx.params

  public schema = schema.create({
    id: schema.number(),
  })
}
