<h1 align="center">DAF Backend - API</h1>

<p align="center"><em>Projeto acadêmico desenvolvido para a disciplina Desenvolvimento de Aplicações com Frameworks Web.</em></p>

<div align="center">
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/NODE-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/EXPRESS-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <br>
  <img src="https://img.shields.io/badge/POSTGRESQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/PRISMA-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/DOCKER_COMPOSE-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose">
  <br>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/BCRYPT-4B5563?style=for-the-badge&logoColor=white" alt="Bcrypt">
  <img src="https://img.shields.io/badge/JOI-8A4182?style=for-the-badge&logoColor=white" alt="Joi">
  <br>
  <img src="https://img.shields.io/badge/SWAGGER-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger">
  <img src="https://img.shields.io/badge/POKU-7C3AED?style=for-the-badge&logoColor=white" alt="Poku">
  <img src="https://img.shields.io/badge/GROQ-F55036?style=for-the-badge&logoColor=white" alt="Groq">
</div>

<br>

<p align="center">
  <a href="http://localhost:4000/api-docs">
    <img src="https://img.shields.io/badge/ABRIR_SWAGGER-DOCS-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger Docs">
  </a>
</p>

---

## Sobre o Projeto

O **DAF Backend** é uma API desenvolvida como projeto acadêmico da **Universidade Christus**, na disciplina de **Desenvolvimento de Aplicações com Frameworks Web**.

O sistema possui autenticação de usuários com `bcrypt`, geração de token com `JWT`, validação de dados com `Joi`, persistência em banco relacional `PostgreSQL` utilizando `Prisma ORM` e integração com chatbot por meio da API da `Groq`.

A arquitetura do backend segue uma organização baseada em camadas, separando responsabilidades entre rotas, controllers, services, middlewares, validações e acesso ao banco de dados.

---

## Funcionalidades

- Cadastro de usuário com nome, email e senha.
- Criptografia de senha com `bcrypt`.
- Login com geração de token `JWT`.
- Rotas protegidas por middleware de autenticação.
- Validação de dados com `Joi`.
- Chatbot integrado com `Groq`.
- Histórico de conversas e mensagens salvo no PostgreSQL.
- Documentação da API com `Swagger`.
- Testes simples com `Poku`.
- Banco de dados local via `Docker Compose`.

---

## Arquitetura

O projeto utiliza uma arquitetura inspirada no padrão MVC, com uma camada adicional de services para concentrar as regras de negócio.

```txt
Routes → Middlewares/Validations → Controllers → Services → Prisma → PostgreSQL
```

Dessa forma, as rotas definem os endpoints, os controllers controlam as requisições e respostas, os services concentram a lógica principal e o Prisma realiza a comunicação com o banco de dados.

---

## Documentação com Swagger

A documentação da API foi criada em formato `JSON`, seguindo o padrão OpenAPI.

Com o servidor rodando, acesse:

```txt
http://localhost:3000/api-docs
```

Também é possível visualizar o JSON bruto em:

```txt
http://localhost:3000/api-docs.json
```

---

## Autenticação e Segurança

A autenticação utiliza `JWT`. Após realizar login, o backend retorna um token que deve ser enviado nas rotas protegidas pelo header:

```txt
Authorization: Bearer SEU_TOKEN_AQUI
```

As senhas dos usuários não são armazenadas em texto puro. Antes de serem salvas no banco de dados, elas são criptografadas com `bcrypt`.

As entradas das rotas são validadas com `Joi`, evitando dados inválidos como email mal formatado, senha vazia ou mensagens sem conteúdo.

---

## Banco de Dados

O banco utilizado é o `PostgreSQL`, executado localmente com `Docker Compose`. A manipulação dos dados é feita com `Prisma ORM`.

Principais modelos:

- `User`: armazena os usuários cadastrados.
- `Conversation`: representa uma conversa entre usuário e chatbot.
- `Message`: armazena mensagens enviadas pelo usuário e respostas do bot.

---

## Testes

Os testes simples da API foram implementados com `Poku`, validando endpoints principais como healthcheck, cadastro e login.

Para executar os testes:

```bash
npm test
```

Para os testes funcionarem, o servidor deve estar rodando localmente em:

```txt
http://localhost:4000
```

---

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado
- Docker e Docker Compose instalados
- Postman, Insomnia ou ferramenta similar para testar as rotas

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd DAF_backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:admin123@localhost:55432/daf_web?schema=public"

PORT=4000
AUTH_SECRET="minha-chave-super-secreta-para-desenvolvimento-daf-web"
JWT_EXPIRES_IN="24h"

GROQ_API_KEY="sua_chave_da_groq"
```

### 4. Subir o banco com Docker Compose

```bash
docker compose up
```

### 5. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

### 6. Gerar o Prisma Client

```bash
npx prisma generate
```

### 7. Rodar o servidor

```bash
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:4000
```

---

## Rotas principais

| Método | Rota                  | Descrição                                 | Protegida |
| ------ | --------------------- | ----------------------------------------- | --------- |
| GET    | `/`                   | Verifica se a API está rodando            | Não       |
| POST   | `/auth/register`      | Cadastra um novo usuário                  | Não       |
| POST   | `/auth/login`         | Realiza login e retorna JWT               | Não       |
| POST   | `/chat/message`       | Envia uma mensagem para o chatbot         | Sim       |
| GET    | `/chat/conversations` | Lista as conversas do usuário autenticado | Sim       |

---

## Estrutura de Pastas

```txt
DAF_backend/

├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── chatController.js
│   │
│   ├── docs/
│   │   └── swagger.json
│   │
│   ├── lib/
│   │   ├── groqClient.js
│   │   └── prismaInstance.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── validateMiddleware.js
│   │
│   ├── prompts/
│   │   └── systems.txt
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── chatRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── chatbotService.js
│   │
│   ├── validations/
│   │   ├── authValidation.js
│   │   └── chatValidation.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── auth.test.js
│   └── health.test.js
│
├── docker-compose.yml
├── package.json
├── prisma.config.ts
└── README.md
```

---

## Comandos úteis

```bash
npm run dev
```

```bash
npm test
```

```bash
npx prisma studio
```

```bash
npx prisma migrate dev
```

```bash
docker compose up
```

```bash
docker compose down
```

---

## Informações Acadêmicas

**Instituição:** Universidade Christus

**Disciplina:** Desenvolvimento de Aplicações com Frameworks Web

**Projeto:** DAF Backend

**Foco:** Backend com Node.js, Express, Prisma, PostgreSQL, autenticação JWT, validação com Joi, testes com Poku e documentação Swagger.
