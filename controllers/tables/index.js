'use strict';

const parse = require('co-body');
const winston = require('winston');

const render = require('../../render');
const Table = require('./model');

class CommonResponse {
  constructor() {
    this.success = true;
    this.status = 200;
  }
}

exports.list = function *listTables() {
  this.body = yield Table.all();
};

exports.add = function *createTable() {
  const body = this.body;

  this.assert(body, 400, 'Body is empty');
  this.assert(body.game, 400, 'Body.game is empty');
  const table = new Table({
    description: body.description,
    game: body.game
  });
  const response = new CommonResponse();

  response.data = yield table.save();
  winston.silly(response);
  this.body = response;
};

exports.get = function *getOne() {
  const params = this.params;

  this.assert(params, 400, 'Params are empty');
  const table = yield Table.where('_id', params.tableId).findOne();

  const response = new CommonResponse();

  if (table) {
    response.data = table;
  } else {
    response.message = 'Table not found';
    this.status = response.status = 404;
  }
  winston.silly(response);
  this.body = response;
};

exports.edit = function *editTable() {
  const body = this.body;
  const params = this.params;

  this.assert(body, 400, 'Body is empty');
  this.assert(params, 400, 'Params are empty');
  const table = yield Table.where('_id', params.tableId).findOne();

  this.assert(table, 404, 'Table not found');

  winston.silly(table);
  if (body.description) {
    table.set('description', body.description);
  }
  if (body.game) {
    table.set('game', body.game);
  }
  const response = new CommonResponse();

  response.data = yield table.save();
  winston.silly(response);
  this.body = response;
};

exports.remove = function *removeTable() {
  const params = this.params;

  this.assert(params, 400, 'Params are empty');
  winston.debug(params);

  const table = yield Table.where('_id', params.tableId).findOne();

  this.assert(table, 404, 'Table is removed');

  table.set('deleted', true);

  const response = new CommonResponse();

  const removal = yield table.remove();

  response.data = removal;
  winston.silly(response);
  this.body = response;
};

/**
 * Get Tables
 * @deprecated
 */
function *getTables() {

  const tables = yield Table.all();

  winston.silly(tables);
  this.body = yield render('tables', {tables});

}

/**
 * Post Table
 * @deprecated
 */
function *postTables() {

  const table = new Table(yield parse(this));

  winston.silly(table);
  yield table.save();
  this.redirect('/tables');

}

exports.getTables = getTables;
exports.postTables = postTables;