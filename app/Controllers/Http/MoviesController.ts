import Movie from 'App/Models/Movie'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  GetMoviesValidator,
  MovieValidator,
  UpdateMovieValidator,
  DeleteMovieValidator,
} from 'App/Validators/MovieValidator'

export default class MoviesController {
  public async index({ request }: HttpContextContract) {
    const payload = await request.validate(GetMoviesValidator)

    const page = payload.page || 1
    const limit = payload.limit || 10

    const movies = await Movie.query().paginate(page, limit)

    return movies
  }

  public async store({ request }: HttpContextContract) {
    const validatedPayload = await request.validate(MovieValidator)
    const movie = await Movie.create(validatedPayload)
    return movie
  }

  public async update({ params, request }: HttpContextContract) {
    const validatedPayload = await request.validate(UpdateMovieValidator)
    const movie = await Movie.findOrFail(params.id)

    movie.merge(validatedPayload)
    await movie.save()

    return movie
  }

  public async delete({ params, request }: HttpContextContract) {
    await request.validate(DeleteMovieValidator)
    const movie = await Movie.findOrFail(params.id)

    await movie.delete()
    return { message: `Movie with ID ${params.id} has been permanently deleted.` }
  }
}
