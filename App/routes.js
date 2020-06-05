const { Router } = require('express');
const UserController = require('./Controllers/UserController');


class UserRouter {
  constructor() {
    this.UserRouter = Router();
    this.config();
  }

  config() {
    this.UserRouter.post('/users/login', UserController.login);
    this.UserRouter.post('/users/signin', UserController.signin);
    this.UserRouter.put('/users/:email', UserController.updateUser);
    this.UserRouter.get('/users/:email', UserController.getUserByEmail);
    this.UserRouter.put('/users/:email/password', UserController.changePassword);
    this.UserRouter.get('/users/:id/user', UserController.getUsersById);
    this.UserRouter.put('/users/recoverPass/:email', UserController.recoverPassword);
  }
}

const router = new UserRouter();
module.exports = router.UserRouter;
