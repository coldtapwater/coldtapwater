import { body, param, query, validationResult } from 'express-validator';

// Helper to handle validation results
export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// User registration validation
export const validateUserRegistration = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/)
        .withMessage('Password must contain at least one letter and one number'),
    handleValidation
];

// User login validation
export const validateUserLogin = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Must be a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidation
];

// API key generation validation
export const validateApiKeyGeneration = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('API key name must be between 1 and 100 characters'),
    handleValidation
];

// Codeshot API validation
export const validateCodeshotRequest = [
    // Code content validation
    body('code')
        .notEmpty()
        .withMessage('Code content is required')
        .isLength({ max: 50000 })
        .withMessage('Code content must not exceed 50000 characters'),

    // Theme validation
    body('theme')
        .optional()
        .isIn(['light', 'dark', 'dracula', 'monokai', 'solarized'])
        .withMessage('Invalid theme selection'),

    // Background style validation
    body('background')
        .optional()
        .isObject()
        .withMessage('Background must be an object'),
    body('background.style')
        .optional()
        .isIn(['solid', 'gradient', 'pattern'])
        .withMessage('Invalid background style'),
    body('background.color')
        .optional()
        .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .withMessage('Invalid color format'),

    // Window style validation
    body('window')
        .optional()
        .isIn(['clean', 'browser', 'editor'])
        .withMessage('Invalid window style'),

    // Font validation
    body('font')
        .optional()
        .isObject()
        .withMessage('Font must be an object'),
    body('font.family')
        .optional()
        .isString()
        .withMessage('Font family must be a string'),
    body('font.size')
        .optional()
        .isInt({ min: 8, max: 32 })
        .withMessage('Font size must be between 8 and 32'),

    // Line numbers validation
    body('lineNumbers')
        .optional()
        .isBoolean()
        .withMessage('Line numbers must be a boolean'),

    // Line highlighting validation
    body('highlight')
        .optional()
        .isArray()
        .withMessage('Highlight must be an array of line numbers'),
    body('highlight.*')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid line number in highlight array'),

    // Line range validation
    body('range')
        .optional()
        .isObject()
        .withMessage('Range must be an object'),
    body('range.start')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid range start'),
    body('range.end')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid range end'),

    // Output options validation
    body('output')
        .optional()
        .isObject()
        .withMessage('Output must be an object'),
    body('output.format')
        .optional()
        .isIn(['png', 'jpeg', 'svg'])
        .withMessage('Invalid output format'),
    body('output.quality')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Quality must be between 1 and 100'),
    body('output.width')
        .optional()
        .isInt({ min: 100, max: 4000 })
        .withMessage('Width must be between 100 and 4000'),
    body('output.height')
        .optional()
        .isInt({ min: 100, max: 4000 })
        .withMessage('Height must be between 100 and 4000'),

    // Developer features validation
    body('developer')
        .optional()
        .isObject()
        .withMessage('Developer options must be an object'),
    body('developer.language')
        .optional()
        .isString()
        .withMessage('Language must be a string'),
    body('developer.showPath')
        .optional()
        .isBoolean()
        .withMessage('Show path must be a boolean'),
    body('developer.tabSize')
        .optional()
        .isInt({ min: 2, max: 8 })
        .withMessage('Tab size must be between 2 and 8'),
    body('developer.wordWrap')
        .optional()
        .isBoolean()
        .withMessage('Word wrap must be a boolean'),

    handleValidation
];
