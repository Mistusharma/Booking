const { config } = require('dotenv');
const { Pool } = require('pg');

// Load environment variables from .env
require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT, // Default PostgreSQL port
});

// Log successful connection
pool.on('connect', () => {
  console.log(`Connected to the database `);
});

// Handle connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

// Export the pool to use in services
module.exports = pool;
