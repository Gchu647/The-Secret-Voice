// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.USER || 'secret_user', // create your own db and user on your Postgres to run program
      password: process.env.PASSWORD || 'password',
      database: 'secret_voice',
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};
