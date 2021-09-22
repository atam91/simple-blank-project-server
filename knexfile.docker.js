// Update with your config settings.

module.exports = {
  /**test: {
    client: 'pg',
    connection: 'postgres://simple_blank_project:qweqwe@localhost/simple_blank_project_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/'           /// TODO separate test seeds???
    }
  },**/

  development: {
    client: 'pg',
    connection: 'postgres://simple_blank_project:qweqwe@postgres/simple_blank_project',
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: '__knex_migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds/',
    }
  },

  /**staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }**/

};
