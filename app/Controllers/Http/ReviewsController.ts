import Review from 'App/Models/Review'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { 
  GetReviewsValidator, 
  CreateReviewValidator, 
  UpdateReviewValidator, 
  DeleteReviewValidator 
} from 'App/Validators/ReviewValidator'

export default class ReviewsController {
  
  public async index({ request }: HttpContextContract) {
    const { limit } = await request.validate(GetReviewsValidator)
    
    if (limit) {
      return await Review.query().limit(limit)
    }
    return await Review.all()
  }

  public async store({ request }: HttpContextContract) {
    const validatedPayload = await request.validate(CreateReviewValidator)
    const review = await Review.create(validatedPayload)
    return review
  }

  public async update({ params, request }: HttpContextContract) {
    const validatedPayload = await request.validate(UpdateReviewValidator)
    const review = await Review.findOrFail(params.id)
    
    review.merge(validatedPayload)    
    await review.save()
    
    return review
  }

  public async delete({ params, request }: HttpContextContract) {
    await request.validate(DeleteReviewValidator)
    const review = await Review.findOrFail(params.id)
    
    await review.delete()
    return { message: `Review with ID ${params.id} has been permanently deleted.` }
  }
}