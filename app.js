'use strict';

// Global dependencies
const app = require('koa')();
const logger = require('koa-logger');
const route = require('koa-route');
const Router = require('koa-router');
const json = require('koa-json');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const koaBetterBody = require('koa-better-body');
const Mongorito = require('mongorito');

// Project dependencies
const Tables = require('./controllers/tables');
const router = require('./router');

// Internal variables
const getTables = Tables.getTables;
const postTables = Tables.postTables;

// logger
app.use(logger());

// response with static
app.use(favicon('public/favicon.ico'));
app.use(serve('public', {
  maxage: 10000
}));


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

router.use(koaBetterBody());

// TODO change this to more general
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
