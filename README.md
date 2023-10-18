# meal-planner

Express + React + MongoDB meal planning app

## Technologies

#### Server:

- Node.js
- Express

#### Client:

- React

#### Authentication

- jsonwebtokens

## Running it locally

### Requirements:

- node
- npm
- Docker

### steps:

1. start the DB docker image
   ```
   docker compose up -d
   ```
2. Open `http://localhost:8081` and create a database by giving it a name (e.g. `meal-planner`)
3. Copy `.env.template` to `.env` and fill out the values
4. Start server
   ```
   cd ./api
   npm install
   npm run dev
   ```
5. Start client
   ```
   cd ../client
   npm install
   npm start
   ```
