import jwt from 'jsonwebtoken';
import { prisma, apiKeyUtils } from './database.js';
import { createError } from '../lib/utils/errors.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

// Middleware to verify API key
export const verifyApiKey = async (req, res, next) => {
    try {
        const apiKey = req.header('X-API-Key');
        
        if (!apiKey) {
            throw createError.authentication('API key is required');
        }

        if (!apiKeyUtils.validateApiKeyFormat(apiKey)) {
            throw createError.validation('Invalid API key format');
        }

        const encryptedKey = apiKeyUtils.encryptApiKey(apiKey);
        const foundKey = await prisma.apiKey.findFirst({
            where: {
                key: encryptedKey,
                isRevoked: false,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            },
            include: {
                user: {
                    select: {
                        id: true,
                        role: true
                    }
                }
            }
        });

        if (!foundKey) {
            throw createError.authentication('Invalid API key');
        }

        // Update last used timestamp
        await prisma.apiKey.update({
            where: { id: foundKey.id },
            data: { lastUsed: new Date() }
        });

        // Attach key info to request
        req.apiKey = {
            ...foundKey,
            key: apiKeyUtils.decryptApiKey(foundKey.key)
        };
        req.user = foundKey.user;
        
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware to verify admin API key
export const verifyAdminApiKey = async (req, res, next) => {
    try {
        const apiKey = req.header('X-API-Key');
        
        if (!apiKey) {
            throw createError.authentication('API key is required');
        }

        if (!apiKey.startsWith('frgmt-admin-')) {
            throw createError.authorization('Admin API key required');
        }

        const encryptedKey = apiKeyUtils.encryptApiKey(apiKey);
        const foundKey = await prisma.apiKey.findFirst({
            where: {
                key: encryptedKey,
                isAdmin: true,
                isRevoked: false,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            },
            include: {
                user: {
                    select: {
                        id: true,
                        role: true
                    }
                }
            }
        });

        if (!foundKey) {
            throw createError.authentication('Invalid admin API key');
        }

        // Update last used timestamp
        await prisma.apiKey.update({
            where: { id: foundKey.id },
            data: { lastUsed: new Date() }
        });

        // Attach key info to request
        req.apiKey = {
            ...foundKey,
            key: apiKeyUtils.decryptApiKey(foundKey.key)
        };
        req.user = foundKey.user;
        
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw createError.authentication('Authentication token is required');
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                role: true
            }
        });

        if (!user) {
            throw createError.authentication('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(createError.authentication('Invalid token'));
        } else if (error.name === 'TokenExpiredError') {
            next(createError.authentication('Token expired'));
        } else {
            next(error);
        }
    }
};

// Middleware to verify admin user
export const verifyAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        next(createError.authorization('Admin privileges required'));
    }
};

// Rate limiting middleware
export const rateLimit = {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // limit each IP to 100 requests per windowMs
};

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    if (err.statusCode) {
        return res.status(err.statusCode).json({
            error: {
                type: err.name,
                message: err.message,
                details: err.details
            }
        });
    }

    // Handle Prisma errors
    if (err.code) {
        switch (err.code) {
            case 'P2002':
                return res.status(400).json({
                    error: {
                        type: 'ValidationError',
                        message: 'Unique constraint violation',
                        details: err.meta?.target
                    }
                });
            case 'P2025':
                return res.status(404).json({
                    error: {
                        type: 'NotFoundError',
                        message: 'Record not found'
                    }
                });
        }
    }

    // Default error
    res.status(500).json({
        error: {
            type: 'InternalServerError',
            message: process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : err.message
        }
    });
};
