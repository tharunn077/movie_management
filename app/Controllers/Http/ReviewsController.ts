import Review from 'App/Models/Review'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  GetReviewsValidator,
  CreateReviewValidator,
  UpdateReviewValidator,
  DeleteReviewValidator,
} from 'App/Validators/ReviewValidator'

export default class ReviewsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { limit } = await request.validate(GetReviewsValidator)

      if (limit) {
        return Review.query().limit(limit)
      }

      return Review.all()
    } catch (error) {
      return response.badRequest({
        message: 'Failed to fetch reviews.',
        error: error.messages || error.message,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validatedPayload = await request.validate(CreateReviewValidator)

      return Review.create(validatedPayload)
    } catch (error) {
      return response.badRequest({
        message: 'Failed to create review.',
        error: error.messages || error.message,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateReviewValidator)

      const review = await Review.findOrFail(params.id)

      review.merge(request.only(['rating', 'comment']))
      await review.save()

      return review
    } catch (error) {
      return response.badRequest({
        message: 'Failed to update review.',
        error: error.messages || error.message,
      })
    }
  }

  public async delete({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteReviewValidator)

      const review = await Review.findOrFail(params.id)

      await review.delete()

      return {
        message: `Review with ID ${params.id} has been permanently deleted.`,
      }
    } catch (error) {
      return response.badRequest({
        message: 'Failed to delete review.',
        error: error.messages || error.message,
      })
    }
  }
}