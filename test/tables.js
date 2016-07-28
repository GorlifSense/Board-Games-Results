'use strict';

const Mongorito = require('mongorito');
const should = require('chai').should();

const _ = require('lodash');

const tableGenerator = require('./fixtures/tables');
const tables = require('../controllers/tables');

require('mocha-generators').install();
require('../helpers/logger');
// TODO remove Winston
const winston = require('winston');

describe('Tables controller', () => {

  before(() => {
    const mongoDBUrl = 'mongodb://localhost/boardgamesresults';

    Mongorito.connect(process.env.MONGO || mongoDBUrl);
    tables.assert = (params, statusCode, stringLine) => {
      // should.exist(params);
    };

  });

  it('should createTable', function *test1() {

    let generatedTable = tableGenerator();

    // generatedTable._id = '5771ba42209301cc089f43dd';
    tables.body = generatedTable;
    winston.debug('tables == ', tables);

    yield tables.add();
    winston.silly('tables == ', tables);

    should.exist(tables.body.data);
    tables.body.success.should.be.equal(true);
    tables.body.status.should.be.equal(200);
    tables.body.data.attributes.createdBy.should.be.equal('anonymous');
    tables.status.should.be.equal(200);

  });

  it.skip('should edit table and find it', function *test4b() {
    tables.params = {
      tableId: '5771ba42209301cc089f43dd'
    };
    tables.body.createdBy = '1377ba42209301cc089f43d9';
    yield tables.edit();

    winston.debug('tables == ', tables);

    should.exist(tables.body.message);
    // TODO FINISH TEST
    // tables.body.status.should.be.equal(200);
    // tables.status.should.be.equal(200);
    // tables.body.data.attributes
    //   .createdBy.should.be.equal('1377ba42209301cc089f43d9');

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
