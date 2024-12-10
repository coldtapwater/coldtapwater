// Custom error class for API errors
export class ApiError extends Error {
    constructor(statusCode, message, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'ApiError';
    }
}

// Common error types
export const ErrorTypes = {
    VALIDATION_ERROR: 'ValidationError',
    AUTHENTICATION_ERROR: 'AuthenticationError',
    AUTHORIZATION_ERROR: 'AuthorizationError',
    NOT_FOUND_ERROR: 'NotFoundError',
    RATE_LIMIT_ERROR: 'RateLimitError',
    DATABASE_ERROR: 'DatabaseError',
    INTERNAL_ERROR: 'InternalError'
};

// Error factory functions
export const createError = {
    validation: (message, details = null) => 
        new ApiError(400, message || 'Validation error', details),
    
    authentication: (message = 'Authentication required') => 
        new ApiError(401, message),
    
    authorization: (message = 'Insufficient permissions') => 
        new ApiError(403, message),
    
    notFound: (resource = 'Resource') => 
        new ApiError(404, `${resource} not found`),
    
    rateLimit: (message = 'Too many requests') => 
        new ApiError(429, message),
    
    database: (message = 'Database operation failed', details = null) => 
        new ApiError(500, message, details),
    
    internal: (message = 'Internal server error', details = null) => 
        new ApiError(500, message, details)
};

// Error response formatter
export const formatErrorResponse = (error) => {
    const response = {
        error: {
            type: error.name,
            message: error.message
        }
    };

    if (error.details) {
        response.error.details = error.details;
    }

    return response;
};

// Common error messages
export const ErrorMessages = {
    INVALID_API_KEY: 'Invalid API key',
    EXPIRED_API_KEY: 'API key has expired',
    INVALID_TOKEN: 'Invalid or expired token',
    MISSING_TOKEN: 'Authentication token is required',
    INVALID_CREDENTIALS: 'Invalid email or password',
    USER_NOT_FOUND: 'User not found',
    EMAIL_ALREADY_EXISTS: 'Email already registered',
    USERNAME_ALREADY_EXISTS: 'Username already taken',
    INVALID_PASSWORD: 'Invalid password format',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_INPUT: 'Invalid input data',
    RESOURCE_NOT_FOUND: 'Requested resource not found',
    UNAUTHORIZED_ACCESS: 'Unauthorized access',
    RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
    SERVER_ERROR: 'Internal server error',
    DATABASE_CONNECTION_ERROR: 'Database connection error',
    INVALID_FILE_FORMAT: 'Invalid file format',
    FILE_TOO_LARGE: 'File size exceeds limit',
    MISSING_REQUIRED_FIELD: 'Missing required field',
    INVALID_OPERATION: 'Invalid operation',
    OPERATION_FAILED: 'Operation failed'
};

// Error handler middleware
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        details: err.details
    });

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(formatErrorResponse(err));
    }

    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
        const apiError = createError.validation(
            'Validation failed',
            Object.values(err.errors).map(e => e.message)
        );
        return res.status(apiError.statusCode).json(formatErrorResponse(apiError));
    }

    // Handle mongoose duplicate key errors
    if (err.code === 11000) {
        const apiError = createError.validation(
            'Duplicate key error',
            Object.keys(err.keyValue).map(key => `${key} already exists`)
        );
        return res.status(apiError.statusCode).json(formatErrorResponse(apiError));
    }

    // Handle all other errors as internal server errors
    const internalError = createError.internal(
        process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    );
    return res.status(internalError.statusCode).json(formatErrorResponse(internalError));
};

// Async handler wrapper to catch promise rejections
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
