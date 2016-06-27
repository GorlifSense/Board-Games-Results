'use strict';

const Mongorito = require('mongorito');

const tableGenerator = require('./fixtures/tables');
const tables = require('../controllers/tables');

const winston = require('winston');

// configure winston
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  level: 'debug',
  prettyPrint: true,
  humanReadableUnhandledException: true
});

describe('Tables controller', () => {

  before(() => {
    Mongorito.connect(process.env.MONGO);
  });

  it('should createTable', () => {
    tables.request = {
      body: tableGenerator()
    };
    winston.debug(tables);
    let table = tables.add(tables.request);
    winston.debug(table);
  });

});
