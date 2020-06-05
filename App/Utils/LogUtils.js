const LogUtils = module.exports;
const uuid = require('uuid/v4');

LogUtils.getLoggerWithId = (log4j, logName) => {
  const transactionId = uuid();

  return log4j.getLogger(`[${logName}] ${transactionId}`);
};
