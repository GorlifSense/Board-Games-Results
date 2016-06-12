'use strict';

var koa = require('koa');
var app = koa();
var route = require('koa-route');
var favicon = require('koa-favicon');
var serve = require('koa-static');
var winston = require('winston');
var parse = require('co-body');
var Mongorito = require('mongorito');
var Model = Mongorito.Model;

var render = require('./render');

// logger
var LOG_LEVEL = 'debug';
// remove old transport
winston.remove(winston.transports.Console);
// add new with Console-logger settings
winston.add(winston.transports.Console, {
  colorize: true,
  level: LOG_LEVEL,
  prettyPrint: true,
  humanReadableUnhandledException: true
});

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  winston.debug('%s %s - %s', this.method, this.status, this.url, ms);
});


// response
app.use(favicon('public/favicon.ico'));
app.use(serve('public', {
  maxage: 10000
}));

app.use(route.get('/api/tables', getTables));
app.use(route.post('/api/tables', postTables));

app.use(route.get('/create', createTable));

// insert Table Schema

class Table extends Model {

}

// route definitions

/**
 * Get Tables
 */

function *getTables() {
  let tables = yield Table.all();
  this.body =  render('tables', { tables: tables });
}

function *postTables() {

  let post = new Table(yield parse(this));
  winston.debug(post);

  yield post.save();
  this.redirect('/');
}

function *createTable() {
  let tables = yield Table.all();
  this.body =  render('create', { tables: tables });
}

/**
 * Connect to Mongo and start app listening to port
 */
module.exports = function startServer (PORT, MONGO) {
  Mongorito.connect(MONGO);
  app.listen(PORT);
};
