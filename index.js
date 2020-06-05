const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const log4js = require('log4js');
const UsersRoutes = require('./App/routes');
const ErroreHandlerMiddleware = require('./App/Utils/ErrorHandler');
const DB = require('./App/Utils/Database');
const { PREFIX } = require('./App/Config/AppConfig');

const logger = log4js.getLogger('Users');

const { PORT = 3001 } = process.env;

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at: Promise', promise, 'reason:', reason);
  logger.error(reason.stack);
});

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set('port', PORT);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(PREFIX, UsersRoutes);
    this.app.use(ErroreHandlerMiddleware.MainHandler);
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('SERVER ON PORT', PORT);
      DB.migrate.latest();
    });
  }
}

const server = new Server();
server.start();

module.exports = server.app;
