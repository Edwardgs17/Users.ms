const DB = require('../Utils/Database');

class UserRepository {
  constructor() {
    this.verifyLog = async (user) => DB('users').count('*').where({ email: user.email })
      .andWhere({ password: user.password })
      .first();
    this.getUsersById = async (id) => DB('users').where({ id }).select('*').first();
    this.createSignin = async (user) => DB('users').insert(user).returning('*');
    this.updateUser = async (user, email) => DB('users').where({ email }).update(user).returning('*');
    this.getUserByEmail = async (email) => DB('users').where({ email }).select('*').first();
    this.countUserbyEmail = (email) => DB('users').count('*').where({ email }).first();
    this.changePassword = async (user, email) => DB('users').where({ email }).update(user).returning('*');
    this.recoverPassword = async (password, email) => DB('users').where({ email }).update({ password }).returning('*');
  }
}
const UserRepositories = new UserRepository();
module.exports = UserRepositories;
