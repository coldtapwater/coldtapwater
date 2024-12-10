import { prisma, passwordUtils, apiKeyUtils } from '../../config/database.js';
import { createError } from '../utils/errors.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

// User Queries
export const userQueries = {
    // Create a new user
    createUser: async (userData) => {
        try {
            // Check for existing user
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: userData.email },
                        { username: userData.username }
                    ]
                }
            });

            if (existingUser) {
                throw createError.validation(
                    existingUser.email === userData.email
                        ? 'Email already registered'
                        : 'Username already taken'
                );
            }

            // Hash password with Argon2
            const hashedPassword = await passwordUtils.hashPassword(userData.password);

            // Create user
            const user = await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword
                }
            });

            // Generate JWT token
            const token = jwt.sign(
                { 
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            return { user: userWithoutPassword, token };
        } catch (error) {
            throw error.code === 'P2002'
                ? createError.validation('Username or email already exists')
                : error;
        }
    },

    // Authenticate user
    authenticateUser: async (email, password) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw createError.authentication('Invalid email or password');
        }

        const isValidPassword = await passwordUtils.verifyPassword(user.password, password);
        if (!isValidPassword) {
            throw createError.authentication('Invalid email or password');
        }

        const token = jwt.sign(
            { 
                id: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    },

    // Get user by ID
    getUserById: async (userId) => {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!user) {
            throw createError.notFound('User');
        }
        return user;
    },

    // Update user
    updateUser: async (userId, updates) => {
        try {
            const user = await prisma.user.update({
                where: { id: userId },
                data: updates,
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return user;
        } catch (error) {
            if (error.code === 'P2025') {
                throw createError.notFound('User');
            }
            throw error;
        }
    },

    // Delete user
    deleteUser: async (userId) => {
        try {
            const user = await prisma.user.delete({
                where: { id: userId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return user;
        } catch (error) {
            if (error.code === 'P2025') {
                throw createError.notFound('User');
            }
            throw error;
        }
    }
};

// API Key Queries
export const apiKeyQueries = {
    // Generate new API key
    generateApiKey: async (userId, name, isAdmin = false) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw createError.notFound('User');
        }

        const key = apiKeyUtils.generateApiKey(isAdmin);
        const encryptedKey = apiKeyUtils.encryptApiKey(key);

        const apiKey = await prisma.apiKey.create({
            data: {
                key: encryptedKey,
                name,
                isAdmin,
                userId,
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year expiration
            }
        });

        return {
            ...apiKey,
            key // Return the unencrypted key only once
        };
    },

    // Get API keys for user
    getUserApiKeys: async (userId) => {
        const keys = await prisma.apiKey.findMany({
            where: {
                userId,
                isRevoked: false,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            }
        });

        return keys.map(key => ({
            ...key,
            key: apiKeyUtils.decryptApiKey(key.key)
        }));
    },

    // Validate API key
    validateApiKey: async (key) => {
        if (!apiKeyUtils.validateApiKeyFormat(key)) {
            throw createError.validation('Invalid API key format');
        }

        const encryptedKey = apiKeyUtils.encryptApiKey(key);
        const foundKey = await prisma.apiKey.findFirst({
            where: {
                key: encryptedKey,
                isRevoked: false,
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
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

        return {
            ...foundKey,
            key: apiKeyUtils.decryptApiKey(foundKey.key)
        };
    },

    // Revoke API key
    revokeApiKey: async (keyId, userId) => {
        try {
            const key = await prisma.apiKey.update({
                where: {
                    id: keyId,
                    userId
                },
                data: {
                    isRevoked: true
                }
            });

            return key;
        } catch (error) {
            if (error.code === 'P2025') {
                throw createError.notFound('API key');
            }
            throw error;
        }
    }
};

// Query Helpers
export const queryHelpers = {
    // Pagination helper
    paginateResults: async (model, query = {}, page = 1, limit = 10) => {
        const skip = (page - 1) * limit;
        const [results, total] = await Promise.all([
            prisma[model].findMany({
                where: query,
                skip,
                take: limit
            }),
            prisma[model].count({ where: query })
        ]);

        return {
            results,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                count: results.length,
                totalCount: total
            }
        };
    }
};
