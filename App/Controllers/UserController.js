const log4js = require('../Utils/Logger');
const logUtils = require('../Utils/LogUtils');
const { BaseError } = require('../Utils/ErrorHandler');
const validator = require('../Validators/Validator');
const Schema = require('../Validators/UsersSchema');
const passSchema = require('../Validators/PasswordSchema');
const userService = require('../Services/UsersServices');


class UserController {
  async login(req, res, next) {
    const logName = 'login User :';
    console.log('asda');
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { body } = req;

    logger.info(`Start UserController.login: params ${JSON.stringify(body)}`);

    try {
      console.log('entro');

      validator(Schema).validateRequest(body);

      return userService.login(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => (new BaseError(error.messsage)));
    } catch (error) {
      return next(error);
    }
  }

  async signin(req, res, next) {
    const logName = 'Register User: ';
    console.log('asdf');
    const logger = logUtils.getLoggerWithId(log4js, logName);

    const { body } = req;

    logger.info(`Start UserController.signin: params ${JSON.stringify(body)}`);

    try {
      validator(Schema).validateRequest(body);


      return userService.signin(body, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.messsage)));
    } catch (error) {
      return next(error);
    }
  }

  async updateUser(req, res, next) {
    const logName = 'Update user';
    const { body } = req;
    const { email } = req.params;

    const logger = logUtils.getLoggerWithId(log4js, logName);

    logger.info(`Start UserController.updateUser: params ${JSON.stringify(email)}`);
    console.log(email);


    try {
      return userService.updateUser(body, email, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.messsage)));
    } catch (error) {
      return next(error);
    }
  }

  async getUserByEmail(req, res, next) {
    const logName = 'get user by email';
    const { email } = req.params;

    const logger = logUtils.getLoggerWithId(log4js, logName);

    logger.info(`Start UserControlle.getUserByEmail: params ${JSON.stringify(email)}`);
    console.log(email);


    try {
      return userService.getUserByEmail(email, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.messsage)));
    } catch (error) {
      return next(error);
    }
  }

  async getUsersById(req, res, next) {
    const logName = 'Get Users';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { params: { id } } = req;

    logger.info(`Start UserControlle.getUsersById: params ${JSON.stringify(id)}`);

    try {
      return userService.getUsersById(id, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.messsage)));
    } catch (error) {
      return next(error);
    }
  }

  async changePassword(req, res, next) {
    const logName = 'Change Password';
    const { body } = req;
    const { email } = req.params;

    const logger = logUtils.getLoggerWithId(log4js, logName);

    logger.info(`Start UserController.ChangePassword : params ${JSON.stringify(email)}`);

    try {
      validator(passSchema).validateRequest(body);

      return userService.changePassword(body, email, { logger, logName })
        .then((response) => res.send(response))
        .catch((error) => next(new BaseError(error.messsage)));
    } catch (error) {
      return next(error);
    }
  }

  async recoverPassword(req, res, next) {
    const logName = 'Send email user: ';
    const logger = logUtils.getLoggerWithId(log4js, logName);
    const { email } = req.params;
    const { body } = req;

    logger.info(`Start UsersController.recoverPassword: params ${JSON.stringify(email)}`);


    return userService.recoverPassword(email, body, { logger, logName })
      .then((response) => res.send({ response }))
      .catch((error) => next(new BaseError(error.message)));
  }
}

const UsersController = new UserController();
module.exports = UsersController;
