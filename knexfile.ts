// Update with your config settings.
import dotenv from 'dotenv'
dotenv.config()
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      extension: 'ts'
    }
  },
  testing: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      extension: 'ts'
    }
  },
  production: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      extension: 'ts'
    }
  }
};
