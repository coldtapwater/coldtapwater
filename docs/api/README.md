# API Documentation

## Overview
This API framework provides authentication, API key management, and tools like the codeshot code screenshot generator. It uses MongoDB for data persistence and includes secure user authentication and API key management.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or accessible URL)
- npm or yarn

### Installation
1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/frgmt-portfolio
JWT_SECRET=your-jwt-secret
API_KEY_SECRET=your-api-key-secret
```

3. Start the API server:
```bash
# Development
npm run dev:api

# Production
npm run api
```

## Authentication

### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "example",
  "email": "user@example.com",
  "password": "securepassword123"
}
```

### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

## API Keys

### Generate API Key
```http
POST /api/keys
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "My API Key"
}
```

### List API Keys
```http
GET /api/keys
Authorization: Bearer <jwt_token>
```

### Delete API Key
```http
DELETE /api/keys/:keyId
Authorization: Bearer <jwt_token>
```

## Codeshot Tool

The codeshot tool generates beautiful screenshots of code with various customization options.

### Generate Screenshot
```http
POST /api/tools/codeshot
X-API-Key: frgmt-your-api-key
Content-Type: application/json

{
  "code": "console.log('Hello, World!');",
  "theme": "dark",
  "background": {
    "style": "solid",
    "color": "#1a1a1a"
  },
  "window": "editor",
  "font": {
    "family": "JetBrains Mono",
    "size": 14
  },
  "lineNumbers": true,
  "highlight": [1, 3],
  "output": {
    "format": "png",
    "quality": 100,
    "width": 800,
    "height": 600
  }
}
```

### Customization Options

#### Themes
- light
- dark
- dracula
- monokai
- solarized

#### Background Styles
- solid
- gradient
- pattern

#### Window Styles
- clean
- browser
- editor

#### Output Formats
- png
- jpeg
- svg

## API Key Format

- Regular API keys start with `frgmt-`
- Admin API keys start with `frgmt-admin-`

## Error Handling

The API uses standard HTTP status codes and returns errors in the following format:

```json
{
  "error": {
    "type": "ValidationError",
    "message": "Invalid input data",
    "details": ["Field 'name' is required"]
  }
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address
- Rate limit headers are included in responses

## Security

- All passwords are hashed using bcrypt
- API keys are encrypted before storage
- JWT tokens expire after 24 hours
- CORS is enabled for specified origins only
- Request validation is performed using express-validator
- Admin routes require special admin API keys

## Development

To run the API in development mode with hot reloading:
```bash
npm run dev:api
```

## Testing

The API includes comprehensive test coverage. To run tests:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
