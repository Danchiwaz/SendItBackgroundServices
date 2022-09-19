require("dotenv").config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DATABASE_USER as string,
  host: process.env.DATABASE_HOST as string,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME as string,
  password: process.env.DATABASE_PASS as string,
});

export default pool;
