const bcrypt = require('bcrypt-nodejs');
const UserRepository = require('../Repositories/UsersRepository');
const log4js = require('../Utils/Logger');

const defaultLogger = log4js.getLogger('UsersServices');

const HTTPClient = require('../Utils/HTTPClient');

const { MICROSERVICE_URL = 'http://localhost:3003' } = process.env;

const BASE_URL = `${MICROSERVICE_URL}/api/notifications-ms`;

class UserServices {
  async login(user, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start UsersServices.Login: body ${JSON.stringify(user)}`);
    let resp;
    try {
      let hash = await UserRepository.getUserByEmail(user.email);
      hash = bcrypt.compareSync(user.password, hash.password);
      if (hash) {
        resp = await UserRepository.getUserByEmail(user.email);

        return { email: resp.email, id: resp.id };
      }

      return null;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async signin(user, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start UsersServices.Login: body ${JSON.stringify(user)}`);
    const res = await UserRepository.countUserbyEmail(user.email);
    logger.info(`Start UsersServices.Login: body ${JSON.stringify(res)}`);
    if (res.count > 0) {
      return null;
    }
    const hash = bcrypt.hashSync(user.password);
    const [resp] = await UserRepository.createSignin({ email: user.email, password: hash });

    return resp;
  }

  async getUserByEmail(email, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start UsersServices.getUserById: params ${JSON.stringify(email)}`);

    const res = UserRepository.getUserByEmail(email);

    return res;
  }

  async updateUser(user, email, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start UsersServices.updateUser: params ${JSON.stringify(email)}`);
    logger.info(`Start UsersServices.updateUser: body ${JSON.stringify(user)}`);
    const [res] = await UserRepository.updateUser(user, email);

    return res;
  }

  async getUsersById(id, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start UsersServices.getUsersById: params ${JSON.stringify(id)}`);

    const res = await UserRepository.getUsersById(id);

    return res;
  }

  async changePassword(user, email, options) {
    const { logger = defaultLogger } = options;

    logger.info(`Start UsersServices.changePassword: params ${JSON.stringify(email)}`);
    logger.info(`Start UsersServices.changePassword: body ${JSON.stringify(user)}`);
    let hash = await UserRepository.getUserByEmail(email);
    hash = bcrypt.compareSync(user.password, hash.password);
    if (hash) {
      hash = bcrypt.hashSync(user.newPassword);
      const [res] = await UserRepository.changePassword({ password: hash }, email);
      const resUser = {};
      resUser.id = res.id;
      resUser.email = res.email;

      return resUser;
    }

    return null;
  }

  async recoverPassword(email, options) {
    const { logger = defaultLogger } = options;
    logger.info(`Start UsersService.recoverPassword: params ${JSON.stringify(email)}`);

    const newPassword = Math.random().toString(36).substring(2);

    const body = {
      password: newPassword,
    };

    HTTPClient.post(`${BASE_URL}/notific/${email}`, body);

    const hash = bcrypt.hashSync(body.password);

    const result = await UserRepository.recoverPassword(hash, email);

    return result;
  }
}
const UserService = new UserServices();
module.exports = UserService;
