# Book Review API

A RESTful API for managing books and reviews with JWT authentication.

## Features

- User authentication (signup/login)
- Book management (create, list, search)
- Review management (create, update, delete)
- Pagination and filtering
- Search functionality

## Technologies

- Node.js
- Express.js
- PostgreSQL
- JWT for authentication

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database with the provided schema
4. Create a `.env` file based on `.env.example`
5. Run the server: `npm start` or `npm run dev` for development

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Books

- `POST /api/books` - Add a new book (authenticated)
- `GET /api/books` - Get all books (with pagination and filters)
- `GET /api/books/:id` - Get book details with reviews
- `GET /api/books/search?q=query` - Search books by title or author

### Reviews

- `POST /api/books/:id/reviews` - Submit a review (authenticated)
- `PUT /api/reviews/:id` - Update your review (authenticated)
- `DELETE /api/reviews/:id` - Delete your review (authenticated)

## Example Requests

### Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
```
