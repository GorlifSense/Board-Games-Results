var koa = require('koa');
var app = koa();
var winston = require('winston');
var favicon = require('koa-favicon');
var serve = require('koa-static');

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
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(serve('public', {
  maxage: 10000
}));

app.listen(3000);
