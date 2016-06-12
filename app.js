'use strict';

const koa = require('koa');
const logger = require('koa-logger');
const app = koa();
const route = require('koa-route');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const winston = require('winston');
const parse = require('co-body');
const Mongorito = require('mongorito');
const Model = Mongorito.Model;

const render = require('./render');

// logger
app.use(logger());

// response
app.use(favicon('public/favicon.ico'));
app.use(serve('public', {
  maxage: 10000
}));

// insert Table Schema

class Table extends Model {}

// route definitions

/**
 * Get Tables
 */
function *getTables() {

  const tables = yield Table.all();

  winston.debug(tables);
  this.body = yield render('tables', { tables: tables });

}

/**
 * Post Table
 */
function *postTables() {

  const post = new Table(yield parse(this));

  winston.debug(post);

  yield post.save();
  this.redirect('/tables');

}

// function *createTable() {}

app.use(route.get('/tables', getTables));
app.use(route.post('/tables', postTables));

// app.use(route.get('/create', createTable));



/**
 * Connect to Mongo and start app listening to port
 */
module.exports = function startServer (PORT, MONGO) {

  Mongorito.connect(MONGO);
  app.listen(PORT);

};
