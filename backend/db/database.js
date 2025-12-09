import 'dotenv/config'
import db from './connection.js'
import auth from './../util/encrypter.js'
import fs from 'fs'
import path from 'path'


const seedOwner = process.argv.includes('test')
const seedMode = process.argv.includes('seed')

if (seedOwner) {
  const hashedPassword = await auth.encryptPassword(process.env.ADMIN_PASSWORD)
  const res = await db.query(
    'INSERT INTO "user" (username,password,email,verification_code,verified,role) VALUES ($1,$2,$3,$4,$5,$6)',
    [process.env.ADMIN_USERNAME, hashedPassword, process.env.ADMIN_EMAIL, process.env.ADMIN_CODE, 1, 'OWNER']
  )
  console.log('Admin user created:', res.rows[0])
}

if (seedMode) {
  const dbfile = fs.readFileSync("./db/schema.sql").toString()
  //const seedFile = fs.readFileSync("./db/testSchema.sql").toString()
  //console.log(seedFile)


  try {
  await db.query(dbfile)
  //await db.query(seedFile)
    console.log('Seed data loaded successfully!')
  } catch (err) {
    console.error('Error loading seed data:', err)
  }
}
