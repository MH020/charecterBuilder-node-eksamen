import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DB_URI_DEV,
      ssl: { rejectUnauthorized: false }
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: 'knex_migrations' }
  },

  staging: {
    client: 'pg',
    connection: {
      connectionString: process.env.DB_URI_DEV,
      ssl: { rejectUnauthorized: false }
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: 'knex_migrations' }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DB_URI_PROD,
      ssl: { rejectUnauthorized: false }
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: 'knex_migrations' }
  }

};
