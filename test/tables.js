'use strict';

const Mongorito = require('mongorito');

const tableGenerator = require('./fixtures/tables');
const tables = require('../controllers/tables');

require('mocha-generators').install();
// const fakeDb  = require('tingodb')(helpers.tingoDb.config); // TODO

require('../helpers/logger');
const winston = require('winston');

describe('Tables controller', () => {

  before(() => {
    Mongorito.connect(process.env.MONGO || 'mongodb://localhost:27017/boardgamesresults');
  });

  it('should createTable', () => {
    tables.request = {
      body: tableGenerator()
    };
    winston.debug(tables);
    const table = tables.add(tables.request);

    winston.debug(table);

    // TODO write actual tests
    //
    // const list = tables.list(tables.request);
    // winston.debug(tables.body);
    //

  });

  it('should try test generators', function *testGenerator() {
    tables.request = {
      body: tableGenerator()
    };
    tables.assert = function () {
      winston.debug('Here assert');
    };
    tables.params = {
      tableId: '5771ba42209301cc089f43d9'
    };
    const got = yield tables.get();
    winston.debug(got);
  });

});
