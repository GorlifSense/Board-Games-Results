'use strict';

const Mongorito = require('mongorito');
const should = require('chai').should();

const tableGenerator = require('./fixtures/tables');
const tables = require('../controllers/tables');

require('mocha-generators').install();
require('../helpers/logger');
// TODO remove Winston
const winston = require('winston');

describe('Tables controller', () => {

  before(() => {
    const mongoDBUrl = 'mongodb://localhost/boardgamesresults_test';

    Mongorito.connect(process.env.MONGO || mongoDBUrl);
    tables.assert = (params, statusCode, stringLine) => {
      // should.exist(params);
    };
  });

  it('should createTable', function *test1() {

    tables.body = tableGenerator();

    yield tables.add();

    should.exist(tables.body.data);
    tables.body.success.should.be.equal(true);
    tables.body.status.should.be.equal(200);
    tables.status.should.be.equal(200);
    winston.debug('tables == ', tables);

  });

  it('should get table and not found it', function *test2() {

    tables.params = {
      tableId: '5771ba42209301cc089f43d9'
    };
    yield tables.get();

    should.exist(tables.body.message);
    tables.body.success.should.be.equal(false);
    tables.body.status.should.be.equal(404);
    tables.status.should.be.equal(404);
  });

  it('should delete table and not found it', function *test3() {

    tables.params = {
      tableId: '5771ba42209301cc089f43d9'
    };
    yield tables.remove();

    should.exist(tables.body.message);
    tables.body.success.should.be.equal(false);
    tables.body.status.should.be.equal(404);
    tables.status.should.be.equal(404);
  });

  it('should edit table but not found it', function *test4() {

    tables.params = {
      tableId: '5771ba42209301cc089f43d9'
    };
    yield tables.edit();

    should.exist(tables.body.message);
    tables.body.success.should.be.equal(false);
    tables.body.status.should.be.equal(404);
    tables.status.should.be.equal(404);
  });

  it('should list all tables', function *test5() {
    yield tables.list();
    tables.body.should.be.an('array');
    winston.debug('tables count == ', tables.body.length);

  });

  it.skip('should reduce all results to one number', function *test6() {

    yield tables.getTables();
    const firstPlayer = tables.data[0].attributes.game.players[0];
    firstPlayer.situation.should.be.an('number');
    winston.debug('player 1 situation == ', firstPlayer.situation);

  });

});
