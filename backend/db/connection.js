import 'dotenv/config'
import pg from 'pg'
const { Pool, Client } = pg

const prod = process.argv.includes('prod')
let connectionString

const ssl = { rejectUnauthorized: false }

if (prod) {
  connectionString = process.env.DB_URI_PROD
} else {
  connectionString = process.env.DB_URI_DEV
}

console.log(connectionString)

const pool = new Pool({
  connectionString, ssl
})

try {
  const res = await pool.query('SELECT NOW()') //response
  console.log(res.rows)
} catch (err) {
  console.error(err)
}

export default pool
