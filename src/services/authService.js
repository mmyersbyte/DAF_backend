import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prismaInstance } from '../lib/prismaInstance.js';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.AUTH_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
  );
}

export async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error('Nome, email e senha são obrigatórios.');
  }

  const normalizedEmail = email.toLowerCase().trim();

  const userAlreadyExists = await prismaInstance.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (userAlreadyExists) {
    throw new Error('Este email já está cadastrado.');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prismaInstance.user.create({
    data: {
      name,
      email: normalizedEmail,
      passwordHash,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios.');
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await prismaInstance.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    throw new Error('Email ou senha inválidos.');
  }

  const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

  if (!passwordIsValid) {
    throw new Error('Email ou senha inválidos.');
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}
