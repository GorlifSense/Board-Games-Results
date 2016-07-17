'use strict';

const parse = require('co-body');
const winston = require('winston');
const _ = require('lodash'); // eslint-disable-line id-length

const render = require('../../render');
const Table = require('./model');

class CommonResponse {
  constructor() {
    this.success = true;
    this.status = 200;
  }
}

exports.list = function *listTables() {
  this.status = 200;
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
  this.status = 200;
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
    response.success = false;
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

  const response = new CommonResponse();

  if (table) {
    if (body.description) {
      table.set('description', body.description);
    }
    if (body.game) {
      table.set('game', body.game);
    }

    response.data = yield table.save();
  } else {
    this.status = response.status = 404;
    response.success = false;
    response.message = 'Table not found';
  }

  winston.silly(response);
  this.body = response;
};

exports.remove = function *removeTable() {
  const params = this.params;

  this.assert(params, 400, 'Params are empty');
  winston.debug(params);

  const table = yield Table.where('_id', params.tableId).findOne();

  const response = new CommonResponse();

  if (table) {
    table.set('deleted', true);
    const removal = yield table.remove();
    response.data = removal;
  } else if (_.isEmpty(table)) {
    this.status = response.status = 404;
    response.success = false;
    response.message = 'Table not found, it could be removed before';
  }

  winston.silly(response);
  this.body = response;
};

/**
 * Get Tables
 * @deprecated
 */
function *getTables() {

  const tables = yield Table.all();
  tables.forEach(function(table){
    table.attributes.game.players.forEach(function(player){
      player.situation = Object.keys(player.situation).reduce(function(a,b){
        a = typeof a === 'number' ? a : Number(player.situation[a]);
        b = typeof b === 'number' ? b : Number(player.situation[b]);
        return a + b;
      });
    });
  });
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
