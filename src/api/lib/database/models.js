import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto-js';

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// API Key Schema
const apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUsed: {
        type: Date
    }
});

// Generate API key
apiKeySchema.statics.generateKey = function(isAdmin = false) {
    const prefix = isAdmin ? 'frgmt-admin-' : 'frgmt-';
    const randomBytes = crypto.lib.WordArray.random(24);
    const key = prefix + randomBytes.toString();
    return key;
};

// Encrypt API key before saving
apiKeySchema.pre('save', function(next) {
    if (!this.isModified('key')) return next();
    
    // Encrypt the API key
    const encryptedKey = crypto.AES.encrypt(
        this.key,
        process.env.API_KEY_SECRET || 'your-secret-key'
    ).toString();
    
    this.key = encryptedKey;
    next();
});

// Method to decrypt API key
apiKeySchema.methods.getDecryptedKey = function() {
    const bytes = crypto.AES.decrypt(
        this.key,
        process.env.API_KEY_SECRET || 'your-secret-key'
    );
    return bytes.toString(crypto.enc.Utf8);
};

// Method to validate API key format
apiKeySchema.statics.validateKeyFormat = function(key) {
    return /^frgmt-(admin-)?[a-zA-Z0-9_-]+$/.test(key);
};

const User = mongoose.model('User', userSchema);
const ApiKey = mongoose.model('ApiKey', apiKeySchema);

export { User, ApiKey };
