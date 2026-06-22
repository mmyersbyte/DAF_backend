import { assert } from 'poku';

const BASE_URL = 'http://localhost:3000';

const response = await fetch(`${BASE_URL}/`);
const data = await response.json();

assert(response.status === 200, 'GET / deve retornar status 200');
assert(
  data.message === 'DAF Backend rodando.',
  'GET / deve retornar mensagem da API',
);
