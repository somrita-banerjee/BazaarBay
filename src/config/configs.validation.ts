import * as Joi from 'joi';

export const ConfigsValidation = Joi.object({
    PORT: Joi.number().integer().min(2999).max(65535).default(5000),

    MONGO_USER: Joi.string().required(),
    MONGO_PASS: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
    MONGO_DB: Joi.string().default('Bazaarbay'),
});
