import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'O nome é obrigatório.',
    'string.min': 'O nome precisa ter pelo menos 2 caracteres.',
    'string.max': 'O nome pode ter no máximo 100 caracteres.',
    'any.required': 'O nome é obrigatório.',
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    'string.empty': 'O email é obrigatório.',
    'string.email': 'Informe um email válido.',
    'any.required': 'O email é obrigatório.',
  }),

  password: Joi.string().min(6).max(72).required().messages({
    'string.empty': 'A senha é obrigatória.',
    'string.min': 'A senha precisa ter pelo menos 6 caracteres.',
    'string.max': 'A senha pode ter no máximo 72 caracteres.',
    'any.required': 'A senha é obrigatória.',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    'string.empty': 'O email é obrigatório.',
    'string.email': 'Informe um email válido.',
    'any.required': 'O email é obrigatório.',
  }),

  password: Joi.string().required().messages({
    'string.empty': 'A senha é obrigatória.',
    'any.required': 'A senha é obrigatória.',
  }),
});
