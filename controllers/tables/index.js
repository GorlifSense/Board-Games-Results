'use strict';

const parse = require('co-body');
const winston = require('winston');
const _ = require('lodash'); // eslint-disable-line id-length

const render = require('../../render');
const Table = require('./model');

const ok = 200;
const badRequest = 400;
const notFound = 404;

class CommonResponse {
  constructor() {
    this.success = true;
    this.status = ok;
  }
}


exports.list = function *listTables() {
  this.status = ok;
  this.body = yield Table.all();
};

exports.add = function *createTable() {
  const body = this.body;

  this.assert(body, badRequest, 'Body is empty');
  this.assert(body.game, badRequest, 'Body.game is empty');
  const table = new Table({
    description: body.description,
    game: body.game
  });
  const response = new CommonResponse();

  response.data = yield table.save();
  this.status = ok;
  winston.silly(response);
  this.body = response;
};

exports.get = function *getOne() {
  const params = this.params;

  this.assert(params, badRequest, 'Params are empty');
  const table = yield Table.where('_id', params.tableId).findOne();

  const response = new CommonResponse();

  if (table) {
    response.data = table;
  } else {
    response.message = 'Table not found';
    this.status = response.status = notFound;
    response.success = false;
  }
  winston.silly(response);
  this.body = response;
};

exports.edit = function *editTable() {
  const body = this.body;
  const params = this.params;

  this.assert(body, badRequest, 'Body is empty');
  this.assert(params, badRequest, 'Params are empty');
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
    this.status = response.status = notFound;
    response.success = false;
    response.message = 'Table not found';
  }

  winston.silly(response);
  this.body = response;
};

exports.remove = function *removeTable() {
  const params = this.params;

  this.assert(params, badRequest, 'Params are empty');
  winston.debug(params);

  const table = yield Table.where('_id', params.tableId).findOne();

  const response = new CommonResponse();

  if (table) {
    table.set('deleted', true);
    const removal = yield table.remove();

    response.data = removal;
  } else if (_.isEmpty(table)) {
    this.status = response.status = notFound;
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

  // FIXME 500 Error.
  // TypeError: Cannot read property 'players' of undefined
  //    at tables.forEach
  //    (/Users/fcl/src/Board-Games-Results/controllers/tables/index.js:127:15)
  //
  // tables.forEach((table) => {
  //
  //   table.attributes.game.players.forEach((player) => {
  //
  //     const keys = Object.keys(player.situation);
  //
  //     if (keys) {
  //
  //       player.situation = keys.reduce((aVar, bVar) => {
  //         if (typeof aVar !== 'number') {
  //           aVar = Number(player.situation[aVar]);
  //         }
  //         return aVar + Number(player.situation[bVar]);
  //       });
  //     }
  //
  //   });
  // });

  winston.silly(tables);

  this.data = tables;
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
