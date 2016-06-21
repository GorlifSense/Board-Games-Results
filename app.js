'use strict';

const app = require('koa')();
const logger = require('koa-logger');
const route = require('koa-route');
const Router = require('koa-router');
const json = require('koa-json');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const winston = require('winston');
const parse = require('co-body');
const Mongorito = require('mongorito');
const Model = Mongorito.Model;

const render = require('./render');
const router = require('./router');

// logger
app.use(logger());

// response with static
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
  this.body = yield render('tables', {tables});

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

// NOTE soon to be @deprecated
app.use(route.get('/tables', getTables));
app.use(route.post('/tables', postTables));

// API Routes
const api = new Router({
  prefix: '/api'
});
const Boom = require('boom');

// TODO remove pretty print
api.use(json());

api.get('/', function* () {
  this.body = {success: true, status: 200, message: 'Read the docs of API'};
});
api.use('/v:version', router.routes());

app.use(api.routes());
app.use(api.allowedMethods({
  'throw': false,
  notImplemented: () =>
    new Boom.notImplemented('that method is not implemented'),
  methodNotAllowed: () =>
    new Boom.methodNotAllowed('that method is not allowed')
}));

/**
 * Connect to Mongo and start app listening to port
 * @param  {string} PORT  - port of web server
 * @param  {string} MONGO - host of mongodb instance 'mongodb://host/db'
 */
module.exports = function startServer(PORT, MONGO) {

  Mongorito.connect(MONGO);
  app.listen(PORT);

};
