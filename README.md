
# Lost-and-found-backend

## Description

This project is a sample implementation of a lost and found items system service application using Node.js, Express, and Postgres.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Postgres

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nakib1948/Lost-and-found-backend.git
   ```

2. Install dependencies:

   ```bash
   cd Lost-and-found-backend
   npm install
   ```

3. Set up environment variables:

   Create a .env file in the root directory with the following content:

   ```env
   PORT=3000
  DATABASE_URL=your_postgres_db_connection_string
   ```

   Replace `your_postgres_connection_string` with your actual MongoDB connection string.

4. Running the Application

   ### Development

   Run the application in development mode:

   ```bash
   npm run dev
   ```

   The server will restart automatically on file changes.

   ### Production

   Build the application:

   ```bash
   npm run build
   ```

   Start the application:

   ```bash
   npm start
   ```

   The application will be accessible at http://localhost:3000 (or the port specified in your .env file).

5. Linting and Formatting

   ### Linting

   Lint the code:

   ```bash
   npm run lint
   ```

   ### Fixing Linting Issues

   ```bash
   npm run lint:fix
   ```

   ### Prettier Formatting

   Check Prettier formatting:

   ```bash
   npm run prettier:check
   ```

   Format the code with Prettier:

   ```bash
   npm run prettier:fix
   ```
   ### Live Link
     ```bash
   https://lost-and-found-system-iota.vercel.app
   ```
### Documentation
 Follow the link to see the example how the api endpoint works with example:
  ```bash
   https://documenter.getpostman.com/view/31289209/2s9YsDjZsE
   ```
