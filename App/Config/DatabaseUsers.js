const MAX_CONNECTION_POOLSIZE = 5;

const {
  DB_NAME = 'users',
  DB_USER = 'postgres',
  DB_PASS = 'johanandres2',
  DB_HOST = 'localhost',
  DB_PORT = 5432,
} = process.env;


module.exports = {
  client: 'pg',
  connection: `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  pool: { min: 1, max: MAX_CONNECTION_POOLSIZE },
  acquireConnectionTimeout: 5000,
};
