import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async () => {
  return { status: 'online', message: 'Welcome to the Movie API!' }
})

//Movie Routes:
Route.get('/movies', 'MoviesController.index')
Route.post('/movies', 'MoviesController.store').middleware('myJwtGuard')
Route.put('/movies/:id', 'MoviesController.update')
Route.delete('/movies/:id', 'MoviesController.delete').middleware('adminAuth')

//User Routes:
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')

//Review Routes:
Route.get('/reviews', 'ReviewsController.index')
Route.post('/reviews', 'ReviewsController.store').middleware('myJwtGuard')
Route.put('/reviews/:id', 'ReviewsController.update').middleware('myJwtGuard')
Route.delete('/reviews/:id', 'ReviewsController.delete').middleware('adminAuth')
