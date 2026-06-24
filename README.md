# 🎬 Movie Review API

A RESTful Movie Review API built using **AdonisJS v5**, **TypeScript**, and **PostgreSQL**. The application provides secure JWT-based authentication and complete CRUD operations for Movies and Reviews.

---

# 📌 Features

* User Registration & Login
* JWT Authentication
* Movie Management (CRUD)
* Review Management (CRUD)
* PostgreSQL Database Integration
* Request Validation
* Custom Authentication Middleware

---

# 🛠️ Technical Stack

| Technology        | Description           |
| ----------------- | --------------------- |
| Backend Framework | AdonisJS v5           |
| Language          | TypeScript            |
| Database          | PostgreSQL            |
| Authentication    | JSON Web Tokens (JWT) |
| API Testing       | Postman               |

---

# 📂 Project Structure

```text
├── app/
│   ├── Controllers/
│   │   └── Http/
│   │       ├── MoviesController.ts
│   │       ├── ReviewsController.ts
│   │       └── UsersController.ts
│   │
│   ├── Exceptions/
│   │   └── Handler.ts
│   │
│   ├── Middleware/
│   │   ├── JwtAuth.ts
│   │   ├── LogRequest.ts
│   │   └── AdminAuth.ts
│   │
│   ├── Models/
│   │   ├── Movie.ts
│   │   ├── Review.ts
│   │   └── User.ts
│   │
│   └── Validators/
│       ├── MovieValidators.ts
│       ├── ReviewValidators.ts
│       └── UserValidators.ts
│
├── database/
│   └── migrations/
│       ├── xxxx_users.ts
│       ├── xxxx_movies.ts
│       └── xxxx_reviews.ts
│
└── start/
    └── routes.ts
    └── kernal.ts
```
---

# 🗄️ Database Schema

## Users Table

| Column     | Type         |
| ---------- | ------------ |
| id         | Integer (PK) |
| username   | String       |
| email      | String       |
| password   | String       |
| role       | String       |
| created_at | Timestamp    |
| updated_at | Timestamp    |

---

## Movies Table

| Column       | Type         |
| ------------ | ------------ |
| id           | Integer (PK) |
| title        | String       |
| director     | String       |
| genre        | String       |
| release_year | Integer      |
| description  | Text         |
| created_at   | Timestamp    |
| updated_at   | Timestamp    |

---

## Reviews Table

| Column      | Type         |
| ----------- | ------------ |
| id          | Integer (PK) |
| movie_id    | Integer (FK) |
| user_id     | Integer (FK) |
| rating      | Integer      |
| review_text | Text         |
| created_at  | Timestamp    |
| updated_at  | Timestamp    |

---

# 🛣️ Route Configuration

---

## Authentication Routes

| Method | Endpoint  | Controller              |
| ------ | --------- | ----------------------- |
| POST   | /register | AuthController.register |
| POST   | /login    | AuthController.login    |

---

## Movie Routes

| Method | Endpoint    | Controller              | Middleware |
| ------ | ----------- | ----------------------- | ---------- |
| GET    | /movies     | MoviesController.index  | None       |
| POST   | /movies     | MoviesController.store  | myJwtGuard |
| PUT    | /movies/:id | MoviesController.update | None       |
| DELETE | /movies/:id | MoviesController.delete | adminAuth  |

---

## Review Routes

| Method | Endpoint     | Controller               | Middleware |
| ------ | ------------ | ------------------------ | ---------- |
| GET    | /reviews     | ReviewsController.index  | None       |
| POST   | /reviews     | ReviewsController.store  | myJwtGuard |
| PUT    | /reviews/:id | ReviewsController.update | myJwtGuard |
| DELETE | /reviews/:id | ReviewsController.delete | adminAuth  |



# 🔒 Middleware

## Global Middleware

### LogRequest.ts

Logs every incoming request and outgoing response.

**Responsibilities:**

* Logs HTTP method and URL for incoming requests
* Logs HTTP status code for outgoing responses
* Helps with debugging and request tracking

Example Log:

```text
[INBOUND] GET -> /movies
[OUTBOUND] GET -> /movies | Status: 200
```

---

## Named Middleware

### JwtAuth.ts

Protects authenticated routes using JWT.

**Responsibilities:**

* Verifies JWT token
* Authenticates users
* Prevents unauthorized access to protected endpoints

---

### AdminAuth.ts

Protects admin-only operations.

**Responsibilities:**

* Checks for the `admin-key` request header
* Allows access only when the correct secret key is provided
* Restricts sensitive operations such as movie deletion

Example Header:

```http
admin-key: super-secret
```

---

# ✅ Validation Layer

## User Validators

* UserRegisterValidator
* UserLoginValidator

---

## Movie Validators

* GetMoviesValidator
* MovieValidator
* UpdateMovieValidator
* DeleteMovieValidator

---

## Review Validators

* GetReviewsValidator
* CreateReviewValidator
* UpdateReviewValidator
* DeleteReviewValidator
 # ⚠️ Exception Handling

## Handler.ts

A centralized exception handler is used to provide consistent error responses throughout the application.

**Handles:**

* Validation errors (422)
* Authentication/Authorization errors (401)
* Route not found errors (404)
* Internal server errors (500)

### Sample Error Response

```json
{
  "status": "fail",
  "message": "Validation failed. Please check your inputs."
}
```

