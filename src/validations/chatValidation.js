import Joi from 'joi';

export const sendMessageSchema = Joi.object({
  conversationId: Joi.number().integer().positive().optional(),

  content: Joi.string().trim().min(1).max(4000).required().messages({
    'string.empty': 'A mensagem não pode estar vazia.',
    'string.min': 'A mensagem não pode estar vazia.',
    'string.max': 'A mensagem pode ter no máximo 4000 caracteres.',
    'any.required': 'A mensagem é obrigatória.',
  }),
});
