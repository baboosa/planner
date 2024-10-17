# Planner project

Este projeto é uma aplicação que permite o **cadastro** e **login** de usuários, além de fornecer uma interface para manipulação de **tarefas** após o login.

## Tecnologias Utilizadas

- **Backend**: Express.js
- **Frontend**: React
- **Banco de Dados**: MongoDB
- **Gerenciamento de Sessões**: Redis
- **Autenticação**: JWT

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Yarn](https://yarnpkg.com/) (ou NPM)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/baboosa/planner.git
   cd planner

2. Instale as dependências do backend:
    ```bash
    cd ./backend
    yarn install

3. Instale as dependências do frontend:
    ```bash
    cd ./frontend
    yarn install

4. Crie um arquivo .env na raiz do projeto seguindo o padrão do arquivo **env.sample**


## Como Executar o Projeto

1. Navegue até a pasta do backend e inicie o servidor:
    ```bash
    cd backend
    yarn start
O backend estará disponível em http://localhost:5000.

2. Navegue até a pasta do frontend:
    ```bash
    cd ../frontend
3. Inicie o aplicativo React:
    ```bash
    yarn start
