import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import crypto from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Argon2 configuration for password hashing
const argon2Config = {
    memoryCost: parseInt(process.env.ARGON2_MEMORY) || 65536,
    timeCost: parseInt(process.env.ARGON2_TIME) || 3,
    parallelism: parseInt(process.env.ARGON2_PARALLELISM) || 1,
    salt: Buffer.from(process.env.ARGON2_SALT || crypto.lib.WordArray.random(16).toString())
};

// API Key encryption configuration
const API_KEY_ENCRYPTION_KEY = process.env.API_KEY_ENCRYPTION_KEY;

// Password hashing utilities
export const passwordUtils = {
    // Hash password using Argon2
    hashPassword: async (password) => {
        try {
            return await argon2.hash(password, argon2Config);
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Password hashing failed');
        }
    },

    // Verify password using Argon2
    verifyPassword: async (hashedPassword, candidatePassword) => {
        try {
            return await argon2.verify(hashedPassword, candidatePassword);
        } catch (error) {
            console.error('Error verifying password:', error);
            throw new Error('Password verification failed');
        }
    }
};

// API Key encryption utilities
export const apiKeyUtils = {
    // Generate a new API key
    generateApiKey: (isAdmin = false) => {
        const prefix = isAdmin ? 'frgmt-admin-' : 'frgmt-';
        const randomBytes = crypto.lib.WordArray.random(24);
        return prefix + randomBytes.toString();
    },

    // Encrypt API key
    encryptApiKey: (apiKey) => {
        try {
            return crypto.AES.encrypt(apiKey, API_KEY_ENCRYPTION_KEY).toString();
        } catch (error) {
            console.error('Error encrypting API key:', error);
            throw new Error('API key encryption failed');
        }
    },

    // Decrypt API key
    decryptApiKey: (encryptedApiKey) => {
        try {
            const bytes = crypto.AES.decrypt(encryptedApiKey, API_KEY_ENCRYPTION_KEY);
            return bytes.toString(crypto.enc.Utf8);
        } catch (error) {
            console.error('Error decrypting API key:', error);
            throw new Error('API key decryption failed');
        }
    },

    // Validate API key format
    validateApiKeyFormat: (apiKey) => {
        return /^frgmt-(admin-)?[a-zA-Z0-9_-]+$/.test(apiKey);
    }
};

// Database connection management
export const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

// Graceful shutdown
export const disconnectDatabase = async () => {
    try {
        await prisma.$disconnect();
        console.log('Disconnected from PostgreSQL database');
    } catch (error) {
        console.error('Error disconnecting from database:', error);
        throw error;
    }
};

// Handle database errors
prisma.$on('error', (error) => {
    console.error('Prisma Client error:', error);
});

// Export configured Prisma client and utilities
export default {
    prisma,
    passwordUtils,
    apiKeyUtils,
    connectDatabase,
    disconnectDatabase
};
