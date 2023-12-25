const winston = require('winston');
const moment = require('moment-timezone');

const appendTimestamp = winston.format((info, opts) => {
	if (opts.tz) info.timestamp = moment().tz(opts.tz).format();
	return info;
});

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.label({ label: 'BE' }),
		appendTimestamp({ tz: 'Europe/Bucharest' }),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: './logger/logs/backend.log',
			// handleExceptions: true,
			json: false,
		}),
	],
});

var myLogger = {};
myLogger.info = function (sMessage, sComponent) {
	var sLog = '';

	if (!sComponent) {
		sComponent = 'misc';
	}

	sLog = sComponent + '~~' + sMessage;
	logger.info(sLog);
};
myLogger.error = function (sMessage, sComponent) {
	var sLog = '';

	if (!sComponent) {
		sComponent = 'misc';
	}

	sLog = sComponent + '~~' + sMessage;
	logger.error(sLog);
};

module.exports = myLogger;
