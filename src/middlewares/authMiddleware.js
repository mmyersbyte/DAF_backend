import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não informado.',
    });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Token inválido.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token expirado ou inválido.',
    });
  }
}
