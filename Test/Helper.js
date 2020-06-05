const Helpers = module.exports;
const bcrypt = require('bcrypt-nodejs');
const db = require('../App/Utils/Database');

Helpers.db = db;

Helpers.migrate = () => db.migrate.latest();

Helpers.clear = async () => {
  await db('users').del();
};

Helpers.insertUser = async (data) => db('users').insert(data);

Helpers.encrypt = (user) => bcrypt.hashSync(user.password);
Helpers.gets = async (email) => db('users').where({ email });
Helpers.compareSync = (user) => bcrypt.compareSync(user.password);
