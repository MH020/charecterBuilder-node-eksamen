import 'dotenv/config'
import db from './connection.js'
import auth from './../util/encrypter.js'

const seedMode = process.argv.includes('seed')


if (seedMode) {
  const hashedPassword = await auth.encryptPassword(process.env.ADMIN_PASSWORD)
  const res = await db.query(
    'INSERT INTO "user" (username,password,email,verification_code,verified,role) VALUES ($1,$2,$3,$4,$5,$6)',
    [process.env.ADMIN_USERNAME, hashedPassword, process.env.ADMIN_EMAIL, process.env.ADMIN_CODE, 1, 'OWNER']
  )
  console.log('Admin user created:', res.rows[0])
}
