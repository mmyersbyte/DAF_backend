import Joi from 'joi';

export const compareTaxSchema = Joi.object({
  rendaMensal: Joi.number().positive().max(15000).required().messages({
    'number.base': 'A renda mensal deve ser um número.',
    'number.positive': 'A renda mensal deve ser maior que zero.',
    'number.max': 'A renda mensal deve ser de até R$ 15.000.',
    'any.required': 'A renda mensal é obrigatória.',
  }),

  custosMensais: Joi.number().min(0).required().messages({
    'number.base': 'Os custos mensais devem ser um número.',
    'number.min': 'Os custos mensais não podem ser negativos.',
    'any.required': 'Os custos mensais são obrigatórios.',
  }),

  profissao: Joi.string()
    .trim()
    .valid(
      'Psicólogo',
      'Psicóloga',
      'Arquiteto',
      'Arquiteta',
      'Advogado',
      'Advogada',
    )
    .required()
    .messages({
      'string.empty': 'A profissão é obrigatória.',
      'any.only': 'Profissão inválida.',
      'any.required': 'A profissão é obrigatória.',
    }),
});
