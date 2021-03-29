// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'rest_mini_project',
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'rest_mini_project',
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'rest_mini_project',
      user: process.env.PGUSERNAME,
      password: process.env.PGPASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};