import * as Joi from 'joi';

export const ConfigsValidation = Joi.object({
  PORT: Joi.number().integer().min(2999).max(65535).default(5000),
});
