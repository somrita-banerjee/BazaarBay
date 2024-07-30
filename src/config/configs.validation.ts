import * as Joi from 'joi';

export const ConfigsValidation = Joi.object({
    PORT: Joi.number().integer().min(2999).max(65535).default(5000),

    MONGO_USER: Joi.string().required(),
    MONGO_PASS: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
    MONGO_DB: Joi.string().default('Bazaarbay'),

    SALT_ROUNDS: Joi.number().min(6).default(11),
    JWT_SECRET: Joi.string().min(6).required(),
    JWT_EXPIRES_IN: Joi.number()
        .min(60 * 60)
        .default(7 * 24 * 60 * 60),
});
