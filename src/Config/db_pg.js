import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  user: process.env.MYSQL_USER, 
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool;