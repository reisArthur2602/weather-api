# API de Previsão do Tempo

### Funcionalidades

- [x] Obter previsão para uma cidade no dia atual
- [x] Obter previsão para uma cidade em uma data especifica
- [x] Buscar previsão para uma cidade em uma data especifica

### Documentação

<a href="https://weather-b1d0.onrender.com/api-docs/">Documentação</a>

### Example

- ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
  <a href="https://weather-b1d0.onrender.com/weather/rio%20de%20janeiro">Previsão atual do Rio de janeiro </a>

## Endpoints

### /weather/:city

Este endpoint recebe uma cidade como parâmetro e retorna a previsão para a data atual. Caso a previsão não esteja disponivel no banco de dados, irá consultar uma API externa e atualizar o banco de dados

Método: GET

Parâmetros:

- city (obrigatório): Nome da cidade para obter a previsão.

### /weather/filter

Este endpoint recebe uma cidade, data de início e data de fim como parâmetros e retorna a previsão. Caso a previsão não esteja disponivel no banco de dados, irá consultar uma API externa e atualizar o banco de dados

Método: GET

Parâmetros:

- city (obrigatório): Nome da cidade para obter a previsão.
- startDate (opcional): Data limite que deseja buscar as previsões a partir do dia de hoje (formato: YYYY-MM-DD).
- endDate (opcional): Data limite que deseja buscar as previsões a partir do dia de hoje (formato: YYYY-MM-DD).

### /weather/search

Este endpoint recebe dados no corpo da requisição (cidade, data de início e data de término) e retorna a previsão.

Método: POST

Parâmetros:

- city (obrigatório): Nome da cidade para obter a previsão.
- startDate (opcional): Data limite que deseja buscar as previsões a partir do dia de hoje (formato: YYYY-MM-DD).
- endDate (opcional): Data limite que deseja buscar as previsões a partir do dia de hoje (formato: YYYY-MM-DD).

### Para rodar o projeto:

- Cadastre-se em [Weather API](https://www.weatherapi.com/) e guarde sua API KEY
- Crie uma instância no mongoDB
- Criar um arquivo .env e preenche-lo conforme o example.env
- `npm i `
- `npm run dev`

### Tecnologias usadas no projeto

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
