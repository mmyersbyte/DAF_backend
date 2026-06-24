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
  <a href="http://localhost:3000/api-docs">
    <img src="https://img.shields.io/badge/ABRIR_SWAGGER-DOCS-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger Docs">
  </a>
</p>

---

## Sobre o Projeto

O **DAF Backend** é uma API desenvolvida como projeto acadêmico da **Universidade Christus**, na disciplina de **Desenvolvimento de Aplicações com Frameworks Web**.

A API atende o backend da calculadora web comparativa entre **Pessoa Física (PF)** e **Pessoa Jurídica (PJ)**. O sistema permite cadastro e login de usuários, autenticação com `JWT`, cálculo tributário no backend, armazenamento do histórico de comparativos tributários no banco de dados, integração com chatbot via `Groq` e documentação das rotas com `Swagger`.

A arquitetura do backend segue uma organização baseada em camadas, separando responsabilidades entre rotas, controllers, services, middlewares, validações, utilitários de cálculo tributário e acesso ao banco de dados com Prisma.

---

## Funcionalidades

* Cadastro de usuário com nome, email e senha.
* Criptografia de senha com `bcrypt`.
* Login com geração de token `JWT`.
* Rotas protegidas por middleware de autenticação.
* Validação de dados com `Joi`.
* Cálculo tributário PF x PJ realizado no backend.
* Suporte aos cálculos para psicólogos, arquitetos e advogados.
* Salvamento do comparativo tributário do usuário autenticado.
* Histórico de comparativos tributários salvo no PostgreSQL.
* Consulta de comparativos salvos por usuário.
* Chatbot integrado com `Groq`.
* Histórico de conversas e mensagens salvo no PostgreSQL.
* Documentação da API com `Swagger`.
* Testes simples com `Poku`.
* Banco de dados local via `Docker Compose`.

---

## Arquitetura

O projeto utiliza uma arquitetura inspirada no padrão MVC, com uma camada adicional de services para concentrar as regras de negócio.

```txt
Routes → Middlewares/Validations → Controllers → Services → Prisma → PostgreSQL
```

Também há uma camada de utilitários para o motor tributário:

```txt
Services → Utils/Tax → Cálculo PF/PJ
```

Dessa forma:

* As **routes** definem os endpoints da API.
* Os **middlewares** validam autenticação e corpo das requisições.
* Os **controllers** recebem as requisições HTTP e devolvem as respostas.
* Os **services** concentram a lógica principal da aplicação.
* O **Prisma** realiza a comunicação com o banco de dados.
* A pasta **utils/tax** concentra as regras de cálculo tributário.

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

As entradas das rotas são validadas com `Joi`, evitando dados inválidos como email mal formatado, senha vazia, mensagens sem conteúdo, renda acima do limite definido ou profissão inválida.

---

## Cálculo Tributário

O cálculo tributário foi centralizado no backend.

O frontend envia apenas:

```txt
rendaMensal
custosMensais
profissao
```

O backend realiza o cálculo comparativo entre PF e PJ, salva o resultado no PostgreSQL e retorna os dados prontos para o frontend exibir.

Fluxo:

```txt
Usuário autenticado
↓
Frontend envia dados para POST /tax/compare
↓
Backend calcula PF x PJ
↓
Backend salva o comparativo no banco
↓
Backend retorna o resultado
↓
Frontend exibe tabela, gráfico e PDF
```

O motor tributário está organizado em:

```txt
src/utils/tax/
```

Principais arquivos:

* `compare.js`: orquestra o comparativo PF x PJ.
* `pf2026.js`: calcula o cenário de Pessoa Física.
* `pjServicos2026.js`: calcula PJ para psicólogos e arquitetos.
* `pjAdvogado2026.js`: calcula PJ para advogados.
* `irpfProgressive2026.js`: calcula IRPF progressivo.
* `constants2026.js`: centraliza valores e alíquotas.
* `professions.js`: normaliza a profissão informada.
* `round.js`: arredonda valores monetários.

---

## Banco de Dados

O banco utilizado é o `PostgreSQL`, executado localmente com `Docker Compose`. A manipulação dos dados é feita com `Prisma ORM`.

Principais modelos:

* `User`: armazena os usuários cadastrados.
* `Conversation`: representa uma conversa entre usuário e chatbot.
* `Message`: armazena mensagens enviadas pelo usuário e respostas do bot.
* `TaxComparison`: armazena os comparativos tributários calculados para usuários autenticados.

O modelo `TaxComparison` registra informações como:

* profissão;
* renda mensal;
* custos mensais;
* total de impostos como PF;
* total de impostos como PJ;
* renda líquida como PF;
* renda líquida como PJ;
* melhor opção calculada;
* resultado completo em formato JSON.

---

## Testes

Os testes simples da API foram implementados com `Poku`, validando endpoints principais como healthcheck, cadastro e login.

Para executar os testes:

```bash
npm test
```

Para os testes funcionarem, o servidor deve estar rodando localmente em:

```txt
http://localhost:3000
```

---

## Como rodar o projeto

### Pré-requisitos

* Node.js instalado
* Docker e Docker Compose instalados
* Postman, Insomnia ou ferramenta similar para testar as rotas

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

PORT=3000
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
http://localhost:3000
```

---

## Rotas principais

| Método | Rota                   | Descrição                                    | Protegida |
| ------ | ---------------------- | -------------------------------------------- | --------- |
| GET    | `/`                    | Verifica se a API está rodando               | Não       |
| POST   | `/auth/register`       | Cadastra um novo usuário                     | Não       |
| POST   | `/auth/login`          | Realiza login e retorna JWT                  | Não       |
| POST   | `/chat/message`        | Envia uma mensagem para o chatbot            | Sim       |
| GET    | `/chat/conversations`  | Lista as conversas do usuário autenticado    | Sim       |
| POST   | `/tax/compare`         | Calcula e salva o comparativo tributário     | Sim       |
| GET    | `/tax/comparisons`     | Lista os comparativos tributários do usuário | Sim       |
| GET    | `/tax/comparisons/:id` | Busca um comparativo tributário específico   | Sim       |

---

## Exemplos de uso das rotas tributárias

### Calcular e salvar comparativo

```txt
POST /tax/compare
```

Header:

```txt
Authorization: Bearer SEU_TOKEN_AQUI
```

Body:

```json
{
  "rendaMensal": 10000,
  "custosMensais": 1500,
  "profissao": "Psicólogo"
}
```

Resposta esperada:

```json
{
  "message": "Comparativo calculado e salvo com sucesso.",
  "result": {
    "comparisonId": 1,
    "input": {
      "rendaMensal": 10000,
      "custosMensais": 1500,
      "profissao": "Psicólogo",
      "professionId": "psicologo"
    },
    "PF": {
      "imposto": 2528.73,
      "liquido": 7471.27
    },
    "PJ": {
      "totalImpostos": 908,
      "liquido": 9092
    },
    "bestOption": "PJ"
  }
}
```

### Listar histórico tributário

```txt
GET /tax/comparisons
```

Header:

```txt
Authorization: Bearer SEU_TOKEN_AQUI
```

### Buscar comparativo por ID

```txt
GET /tax/comparisons/1
```

Header:

```txt
Authorization: Bearer SEU_TOKEN_AQUI
```

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
│   │   ├── chatController.js
│   │   └── taxController.js
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
│   │   ├── chatRoutes.js
│   │   └── taxRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── chatbotService.js
│   │   └── taxService.js
│   │
│   ├── utils/
│   │   └── tax/
│   │       ├── compare.js
│   │       ├── constants2026.js
│   │       ├── index.js
│   │       ├── irpfProgressive2026.js
│   │       ├── pf2026.js
│   │       ├── pjAdvogado2026.js
│   │       ├── pjServicos2026.js
│   │       ├── professions.js
│   │       └── round.js
│   │
│   ├── validations/
│   │   ├── authValidation.js
│   │   ├── chatValidation.js
│   │   └── taxValidation.js
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

Rodar servidor em desenvolvimento:

```bash
npm run dev
```

Executar testes:

```bash
npm test
```

Abrir Prisma Studio:

```bash
npx prisma studio
```

Rodar migrations:

```bash
npx prisma migrate dev
```

Gerar Prisma Client:

```bash
npx prisma generate
```

Subir banco:

```bash
docker compose up
```

Derrubar banco:

```bash
docker compose down
```

---

## Fluxo completo da aplicação

```txt
1. Usuário realiza cadastro.
2. Usuário faz login.
3. Backend retorna um token JWT.
4. Frontend envia o token nas rotas protegidas.
5. Usuário realiza o cálculo tributário.
6. Backend calcula PF x PJ.
7. Backend salva o comparativo em TaxComparison.
8. Frontend exibe resultado, gráfico e PDF.
9. Usuário pode consultar o histórico pela API.
10. Usuário pode interagir com o chatbot autenticado.
```

---

## Informações Acadêmicas

**Instituição:** Universidade Christus

**Disciplina:** Desenvolvimento de Aplicações com Frameworks Web

**Projeto:** DAF Backend

**Foco:** Backend com Node.js, Express, Prisma, PostgreSQL, autenticação JWT, validação com Joi, cálculo tributário no backend, histórico de comparativos, chatbot com Groq, testes com Poku e documentação Swagger.
