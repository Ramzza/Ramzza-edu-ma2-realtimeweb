const winston = require('winston');
const moment = require('moment-timezone');

const appendTimestamp = winston.format((info, opts) => {
  const information = { ...info };
  if (opts.tz) information.timestamp = moment().tz(opts.tz).format();
  return information;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'BE' }),
    appendTimestamp({ tz: 'Europe/Bucharest' }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: './logger/logs/backend.log',
      // handleExceptions: true,
      json: false,
    }),
  ],
});

const myLogger = {};
myLogger.info = function logInfo(sMessage, sComponent) {
  let sLog = '';
  let sComponentName = sComponent;

  if (!sComponentName) {
    sComponentName = 'misc';
  }

  sLog = `${sComponentName}~~${sMessage}`;
  logger.info(sLog);
};
myLogger.error = function logError(sMessage, sComponent) {
  let sLog = '';
  let sComponentName = sComponent;

  if (!sComponentName) {
    sComponentName = 'misc';
  }

  sLog = `${sComponentName}~~${sMessage}`;
  logger.error(sLog);
};

module.exports = myLogger;
