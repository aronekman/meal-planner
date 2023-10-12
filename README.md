# meal-planner

Express + React + MongoDB meal planning app

## Technologies

#### Server:

- Node.js
- Express

#### Client:

- React

## Running it locally

### Requirements:

- node
- npm

### steps:

1. start the DB docker image
   ```
   docker compose up -d
   ```
2. Open `http://localhost:8081` and create a database by giving it a name (e.g. `meal-planner`)
3. Start server
   ```
   cd ./api
   npm install
   npm run dev
   ```
4. Start client
   ```
   cd ../client
   npm install
   npm start
   ```
