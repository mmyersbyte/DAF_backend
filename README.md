<h1 align="center">

DAF Backend - API

</h1>

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

<hr/>

<h2>Sobre o Projeto</h2>

<p>

O <strong>DAF Backend</strong> é uma API desenvolvida como projeto acadêmico da <strong>Universidade Christus</strong>, na disciplina de <strong>Desenvolvimento de Aplicações com Frameworks Web</strong>.

</p>

<p>

O sistema possui autenticação de usuários com <code>bcrypt</code>, geração de token com <code>JWT</code>, validação de dados com <code>Joi</code>, persistência em banco relacional <code>PostgreSQL</code> utilizando <code>Prisma ORM</code> e integração com chatbot por meio da API da <code>Groq</code>.

</p>

<p>

A arquitetura do backend segue uma organização baseada em camadas, separando responsabilidades entre rotas, controllers, services, middlewares, validações e acesso ao banco de dados.

</p>

<hr/>

<h2>Funcionalidades</h2>

<ul>

  <li>Cadastro de usuário com nome, email e senha.</li>

  <li>Criptografia de senha com <code>bcrypt</code>.</li>

  <li>Login com geração de token <code>JWT</code>.</li>

  <li>Rotas protegidas por middleware de autenticação.</li>

  <li>Validação de dados com <code>Joi</code>.</li>

  <li>Chatbot integrado com <code>Groq</code>.</li>

  <li>Histórico de conversas e mensagens salvo no PostgreSQL.</li>

  <li>Documentação da API com <code>Swagger</code>.</li>

  <li>Testes simples com <code>Poku</code>.</li>

  <li>Banco de dados local via <code>Docker Compose</code>.</li>

</ul>

<hr/>

<h2>Arquitetura</h2>

<p>

O projeto utiliza uma arquitetura inspirada no padrão MVC, com uma camada adicional de services para concentrar as regras de negócio.

</p>

<pre>

Routes → Middlewares/Validations → Controllers → Services → Prisma → PostgreSQL

</pre>

<p>

Dessa forma, as rotas definem os endpoints, os controllers controlam as requisições e respostas, os services concentram a lógica principal e o Prisma realiza a comunicação com o banco de dados.

</p>

<hr/>

<h2>Documentação com Swagger</h2>

<p>

A documentação da API foi criada em formato <code>JSON</code>, seguindo o padrão OpenAPI.

</p>

<p>

Com o servidor rodando, acesse:

</p>

<pre>

http://localhost:4000/api-docs

</pre>

<p>

Também é possível visualizar o JSON bruto em:

</p>

<pre>

http://localhost:4000/api-docs.json

</pre>

<hr/>

<h2>Autenticação e Segurança</h2>

<p>

A autenticação utiliza <code>JWT</code>. Após realizar login, o backend retorna um token que deve ser enviado nas rotas protegidas pelo header:

</p>

<pre>

Authorization: Bearer SEU_TOKEN_AQUI

</pre>

<p>

As senhas dos usuários não são armazenadas em texto puro. Antes de serem salvas no banco de dados, elas são criptografadas com <code>bcrypt</code>.

</p>

<p>

As entradas das rotas são validadas com <code>Joi</code>, evitando dados inválidos como email mal formatado, senha vazia ou mensagens sem conteúdo.

</p>

<hr/>

<h2>Banco de Dados</h2>

<p>

O banco utilizado é o <code>PostgreSQL</code>, executado localmente com <code>Docker Compose</code>. A manipulação dos dados é feita com <code>Prisma ORM</code>.

</p>

<p>Principais modelos:</p>

<ul>

  <li><code>User</code>: armazena os usuários cadastrados.</li>

  <li><code>Conversation</code>: representa uma conversa entre usuário e chatbot.</li>

  <li><code>Message</code>: armazena mensagens enviadas pelo usuário e respostas do bot.</li>

</ul>

<hr/>

<h2>Testes</h2>

<p>

Os testes simples da API foram implementados com <code>Poku</code>, validando endpoints principais como healthcheck, cadastro e login.

</p>

<p>Para executar os testes:</p>

<pre>

npm test

</pre>

<p>

Para os testes funcionarem, o servidor deve estar rodando localmente em:

</p>

<pre>

http://localhost:4000

</pre>

<hr/>

<h2>Como rodar o projeto</h2>

<h3>Pré-requisitos</h3>

<ul>

  <li>Node.js instalado</li>

  <li>Docker e Docker Compose instalados</li>

  <li>Postman, Insomnia ou ferramenta similar para testar as rotas</li>

</ul>

<h3>1. Clonar o repositório</h3>

<pre>

git clone URL_DO_REPOSITORIO

cd DAF_backend

</pre>

<h3>2. Instalar dependências</h3>

<pre>

npm install

</pre>

<h3>3. Configurar variáveis de ambiente</h3>

<p>Crie um arquivo <code>.env</code> na raiz do projeto:</p>

<pre>

DATABASE_URL="postgresql://postgres:admin123@localhost:55432/daf_web?schema=public"



PORT=4000

AUTH_SECRET="minha-chave-super-secreta-para-desenvolvimento-daf-web"

JWT_EXPIRES_IN="24h"



GROQ_API_KEY="sua_chave_da_groq"

</pre>

<h3>4. Subir o banco com Docker Compose</h3>

<pre>

docker compose up

</pre>

<h3>5. Rodar as migrations do Prisma</h3>

<pre>

npx prisma migrate dev

</pre>

<h3>6. Gerar o Prisma Client</h3>

<pre>

npx prisma generate

</pre>

<h3>7. Rodar o servidor</h3>

<pre>

npm run dev

</pre>

<p>A API ficará disponível em:</p>

<pre>

http://localhost:4000

</pre>

<hr/>

<h2>Rotas principais</h2>

<table>

  <thead>

    <tr>

      <th>Método</th>

      <th>Rota</th>

      <th>Descrição</th>

      <th>Protegida</th>

    </tr>

  </thead>

  <tbody>

    <tr>

      <td>GET</td>

      <td><code>/</code></td>

      <td>Verifica se a API está rodando</td>

      <td>Não</td>

    </tr>

    <tr>

      <td>POST</td>

      <td><code>/auth/register</code></td>

      <td>Cadastra um novo usuário</td>

      <td>Não</td>

    </tr>

    <tr>

      <td>POST</td>

      <td><code>/auth/login</code></td>

      <td>Realiza login e retorna JWT</td>

      <td>Não</td>

    </tr>

    <tr>

      <td>POST</td>

      <td><code>/chat/message</code></td>

      <td>Envia uma mensagem para o chatbot</td>

      <td>Sim</td>

    </tr>

    <tr>

      <td>GET</td>

      <td><code>/chat/conversations</code></td>

      <td>Lista as conversas do usuário autenticado</td>

      <td>Sim</td>

    </tr>

  </tbody>

</table>

<hr/>

<h2>Estrutura de Pastas</h2>

<pre>

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

</pre>

<hr/>

<h2>Comandos úteis</h2>

<pre>

npm run dev

</pre>

<pre>

npm test

</pre>

<pre>

npx prisma studio

</pre>

<pre>

npx prisma migrate dev

</pre>

<pre>

docker compose up

</pre>

<pre>

docker compose down

</pre>

<hr/>

<h2>Informações Acadêmicas</h2>

<p>

<strong>Instituição:</strong> Universidade Christus

</p>

<p>

<strong>Disciplina:</strong> Desenvolvimento de Aplicações com Frameworks Web

</p>

<p>

<strong>Projeto:</strong> DAF Backend

</p>

<p>

<strong>Foco:</strong> Backend com Node.js, Express, Prisma, PostgreSQL, autenticação JWT, validação com Joi, testes com Poku e documentação Swagger.

</p>
