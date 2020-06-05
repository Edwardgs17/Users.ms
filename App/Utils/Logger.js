const log4js = require('log4js');

const { env } = process;
const { LOG_LEVEL = 'info' } = env;

log4js.configure({
  appenders: {
    console: { type: 'console', layout: { type: 'colored' } },
  },
  categories: {
    default: { appenders: ['console'], level: LOG_LEVEL },
  },
  replaceConsole: true,
});

module.exports = log4js;
