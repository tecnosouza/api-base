# Projeto API-BASE

Este projeto é uma API base desenvolvida em Node.js, utilizando Express e Sequelize. Ele foi projetado para ser um ponto de partida robusto para o desenvolvimento de aplicações web, oferecendo funcionalidades como autenticação, gerenciamento de usuários, produtos, categorias e logs de erro. O projeto suporta múltiplos bancos de dados (PostgreSQL, MySQL, SQLite) e inclui um frontend básico.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

-   `backend/`: Contém a lógica da API, modelos de banco de dados, controladores, serviços e rotas.
-   `frontend/`: Contém a aplicação cliente (não detalhada neste README, mas os scripts de execução estão disponíveis).

## Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) e o [Yarn](https://yarnpkg.com/) instalados em sua máquina. Para os bancos de dados PostgreSQL e MySQL, é necessário ter o [Docker](https://www.docker.com/) instalado e em execução.

## Instalação

Para instalar todas as dependências do projeto (backend e frontend) e configurar as ferramentas necessárias, execute o seguinte comando na raiz do projeto:

```bash
yarn gl:install
```

Este comando irá:
1.  Remover os diretórios `node_modules` existentes.
2.  Instalar as dependências do projeto raiz.
3.  Instalar as dependências do `frontend`.
4.  Instalar as dependências do `backend`.
5.  Instalar `sequelize-cli` globalmente.

Após a instalação, prepare os hooks do Git:

```bash
yarn gl:prepare
```

## Inicialização do Banco de Dados

Você pode escolher entre PostgreSQL, MySQL ou SQLite para o banco de dados.

### PostgreSQL

Para inicializar o projeto com PostgreSQL (usando Docker):

```bash
yarn be:initbasepg
```

Este comando irá:
1.  Derrubar e remover volumes de qualquer container PostgreSQL existente.
2.  Subir um novo container PostgreSQL via Docker Compose.
3.  Remover e reinstalar as dependências do `backend`.
4.  Executar as migrações e seeds do banco de dados.
5.  Iniciar o servidor backend em modo de desenvolvimento.

### MySQL

Para inicializar o projeto com MySQL (usando Docker):

```bash
yarn be:initbasemysql
```

Este comando irá:
1.  Derrubar e remover volumes de qualquer container MySQL existente.
2.  Subir um novo container MySQL via Docker Compose.
3.  Remover e reinstalar as dependências do `backend`.
4.  Executar as migrações e seeds do banco de dados.
5.  Iniciar o servidor backend em modo de desenvolvimento.

### SQLite

Para inicializar o projeto com SQLite (sem Docker):

```bash
yarn be:initbasesqlite
```

Este comando irá:
1.  Remover o arquivo de banco de dados SQLite existente (`backend/src/database/db/dev.sqlite`).
2.  Executar as migrações e seeds do banco de dados.

## Executando o Projeto

### Backend

Para iniciar o servidor backend em modo de desenvolvimento (após a inicialização do banco de dados):

```bash
yarn be
```

A API estará disponível em `http://localhost:3000` (ou a porta configurada no `.env`). A documentação Swagger estará disponível em `http://localhost:3000/api-docs`.

### Frontend

Para iniciar a aplicação frontend em modo de desenvolvimento:

```bash
yarn fe
```

O frontend estará disponível em `http://localhost:5173` (ou a porta configurada no `.env` do frontend).

## Scripts Úteis

-   **`yarn gl:install`**: Instala todas as dependências do projeto (raiz, frontend, backend) e `sequelize-cli` globalmente.
-   **`yarn gl:prepare`**: Configura os hooks do Git com Husky.
-   **`yarn be:lint`**: Executa o linter no código do backend.
-   **`yarn be:migrate`**: Executa as migrações do banco de dados do backend.
-   **`yarn be:seeds`**: Executa os seeders do banco de dados do backend.
-   **`yarn be:test`**: Executa os testes do backend.
-   **`yarn fe:lint`**: Executa o linter no código do frontend.
-   **`yarn fe:build`**: Compila a aplicação frontend para produção.
