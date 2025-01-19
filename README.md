# Apartment Listing API

A RESTful API built with Node.js, Express, and TypeScript for managing apartment listings. This API provides endpoints to create, retrieve, and manage apartment listings with image upload capabilities.

## Features

- 🏠 CRUD operations for apartment listings
- 📁 Image upload support
- 📝 Swagger API documentation
- 🔐 Rate limiting
- 🌐 CORS support
- 📊 MongoDB integration
- ✨ TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

2. Install dependencies:

3. Create a `.env` file in the root directory and add your MongoDB connection string:

```

## Running the Application

### Development

```

### Production

```bash
npm run build
npm start
```

## API Documentation

The API documentation is available through Swagger UI at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Apartments

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | `/api/apartments`     | Get all apartments    |
| GET    | `/api/apartments/:id` | Get apartment details |
| POST   | `/api/apartments`     | Create new apartment  |

### Request Body Example (POST /api/apartments)

```json
{
  "name": "Luxury Downtown Apartment",
  "unitNumber": "101",
  "area": "1000",
  "project": "Luxury Downtown Apartment",
  "description": "Beautiful apartment in the heart of the city",
  "price": 2500,
  "location": "123 Main St, Downtown",
  "bedrooms": 2,
  "bathrooms": 2,
  "city": "New York",
  "image": [binary file]
}
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── docs/          # API documentation
├── middlewares/   # Custom middleware functions
├── models/        # Database models
├── routes/        # Route definitions
├── services/      # Business logic
└── index.ts       # Application entry point
```

## Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Request validation
- Error handling middleware

## Error Handling

The API implements consistent error handling and returns errors in the following format:

```json
{
  "error": "Error message description"
}
```

## Environment Variables

| Variable    | Description               | Default                                 |
| ----------- | ------------------------- | --------------------------------------- |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/apartment-app |
| PORT        | Server port               | 3000                                    |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)

## Acknowledgments

- Express.js
- MongoDB
- Swagger UI
- TypeScript

```

This README.md provides a comprehensive overview of your project, including:

- Project description and features
- Installation and setup instructions
- API documentation and endpoints
- Project structure
- Security features
- Environment configuration
- Contributing guidelines

You can customize it further by:
1. Adding your specific author information
2. Including any additional setup steps specific to your project
3. Adding more detailed documentation about specific features
4. Including badges (build status, code coverage, etc.)
5. Adding troubleshooting sections if needed
```
