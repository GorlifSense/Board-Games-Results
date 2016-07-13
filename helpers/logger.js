'use strict';

const winston = require('winston');

// configure winston
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  level: process.env.LOG_LEVEL || 'debug',
  prettyPrint: true,
  humanReadableUnhandledException: true
});

module.exports = winston;
