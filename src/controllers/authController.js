import { registerUser, loginUser } from '../services/authService.js';

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await loginUser({
      email,
      password,
    });

    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}
