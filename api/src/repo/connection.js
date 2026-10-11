import 'dotenv/config'
import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
})

export { db };