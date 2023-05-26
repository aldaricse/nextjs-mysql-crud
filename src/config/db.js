import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})