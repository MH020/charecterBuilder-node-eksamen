import 'dotenv/config'
import db from './connection.js'
import auth from './../util/encrypter.js'
import fs from 'fs'
import path from 'path'

const seedMode = process.argv.includes('seed')
const reset = process.argv.includes('reset')

async function database () {
  if (seedMode) {
    const dbFile = fs.readFileSync('./db/schema.sql').toString()
    try {
      await db.query(dbFile)
      // await db.query(seedFile)
      console.log('Seed data loaded successfully!')
    } catch (err) {
      console.error('Error loading seed data:', err)
    }
  }

  if (reset) {
    if (process.argv.includes('prod')) {
      console.log('you are about to reset the prod database please only do that manueally or use migrations')
      return
    }
    const dbFile = fs.readFileSync('./db/schema.sql').toString()
    try {
      await db.query('DROP SCHEMA public CASCADE;')

      await db.query('CREATE SCHEMA public;')

      await db.query(dbFile)

      console.log('database reset and data reloaded')
    } catch (err) {
      console.error('Error loading seed data:', err)
    }
  }
}

database()
