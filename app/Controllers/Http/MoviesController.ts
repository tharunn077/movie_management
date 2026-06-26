import Movie from 'App/Models/Movie'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  GetMoviesValidator,
  MovieValidator,
  UpdateMovieValidator,
  DeleteMovieValidator,
} from 'App/Validators/MovieValidator'

export default class MoviesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(GetMoviesValidator)

      const movies = Movie.query().paginate(payload.page, payload.limit)

      return movies
    } catch (error) {
      return response.badRequest({
        message: 'Failed to fetch movies.',
        error: error.messages || error.message,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validatedPayload = await request.validate(MovieValidator)

      return Movie.create(validatedPayload)
    } catch (error) {
      return response.badRequest({
        message: 'Failed to create movie.',
        error: error.messages || error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateMovieValidator)

      const movie = await Movie.findOrFail(params.id)

      movie.merge(request.only(['title', 'director', 'releaseYear', 'imdbRating']))
      await movie.save()
      return movie
    } catch (error) {
      return response.badRequest({
        message: 'Failed to update movie.',
        error: error.messages || error.message,
      })
    }
  }

  public async delete({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteMovieValidator)

      const movie = await Movie.findOrFail(params.id)

      await movie.delete()

      return {
        message: `Movie with ID ${params.id} has been permanently deleted.`,
      }
    } catch (error) {
      return response.badRequest({
        message: 'Failed to delete movie.',
        error: error.messages || error.message,
      })
    }
  }
}