import { assert } from 'poku';

const BASE_URL = 'http://localhost:3000';

const testEmail = `teste-${Date.now()}@email.com`;
const testPassword = '123456';

const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Usuário Teste',
    email: testEmail,
    password: testPassword,
  }),
});

const registerData = await registerResponse.json();

assert(
  registerResponse.status === 201,
  'POST /auth/register deve cadastrar usuário com status 201',
);

assert(
  registerData.user.email === testEmail,
  'POST /auth/register deve retornar o email cadastrado',
);

const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: testEmail,
    password: testPassword,
  }),
});

const loginData = await loginResponse.json();

assert(
  loginResponse.status === 200,
  'POST /auth/login deve retornar status 200',
);

assert(!!loginData.token, 'POST /auth/login deve retornar um token JWT');

assert(
  loginData.user.email === testEmail,
  'POST /auth/login deve retornar o usuário logado',
);
