import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { errorHandler, verifyApiKey, verifyAdminApiKey, verifyToken, rateLimit } from './config/middleware.js';
import { userQueries, apiKeyQueries } from './lib/database/queries.js';
import { validateUserRegistration, validateUserLogin, validateApiKeyGeneration, validateCodeshotRequest } from './lib/utils/validation.js';
import generateCodeshot from './tools/codeshot/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/register', validateUserRegistration, async (req, res, next) => {
    try {
        const { user, token } = await userQueries.createUser(req.body);
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
});

app.post('/api/auth/login', validateUserLogin, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userQueries.authenticateUser(email, password);
        res.json({ user, token });
    } catch (error) {
        next(error);
    }
});

// API Key routes
app.post('/api/keys', verifyToken, validateApiKeyGeneration, async (req, res, next) => {
    try {
        const apiKey = await apiKeyQueries.generateApiKey(req.user.id, req.body.name);
        res.status(201).json(apiKey);
    } catch (error) {
        next(error);
    }
});

app.get('/api/keys', verifyToken, async (req, res, next) => {
    try {
        const keys = await apiKeyQueries.getUserApiKeys(req.user.id);
        res.json(keys);
    } catch (error) {
        next(error);
    }
});

app.delete('/api/keys/:keyId', verifyToken, async (req, res, next) => {
    try {
        await apiKeyQueries.revokeApiKey(req.params.keyId, req.user.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Admin routes
app.post('/api/admin/keys', verifyToken, verifyAdminApiKey, validateApiKeyGeneration, async (req, res, next) => {
    try {
        const apiKey = await apiKeyQueries.generateApiKey(req.user.id, req.body.name, true);
        res.status(201).json(apiKey);
    } catch (error) {
        next(error);
    }
});

// Codeshot routes
app.post('/api/tools/codeshot', verifyApiKey, validateCodeshotRequest, async (req, res, next) => {
    try {
        await generateCodeshot(req, res);
    } catch (error) {
        next(error);
    }
});

// User routes
app.get('/api/users/me', verifyToken, async (req, res, next) => {
    try {
        const user = await userQueries.getUserById(req.user.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

app.patch('/api/users/me', verifyToken, async (req, res, next) => {
    try {
        const user = await userQueries.updateUser(req.user.id, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Graceful shutdown
const shutdown = async () => {
    try {
        await disconnectDatabase();
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();

export default app;
