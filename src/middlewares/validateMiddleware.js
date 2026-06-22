export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Continua validando mesmo após encontrar o primeiro erro
      stripUnknown: true, // Remove propriedades desconhecidas do objeto validado
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);

      return res.status(400).json({
        message: 'Erro de validação.',
        errors,
      });
    }

    req.body = value; // Atualiza o corpo da requisição com os dados validados e limpos

    return next();
  };
}
