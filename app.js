var koa = require('koa');
var app = koa();
var winston = require('winston');
var favicon = require('koa-favicon');
var serve = require('koa-static');
var mongoose = require('mongoose');

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

var Table = mongoose.model('Table', { description: String });

var table = new Table({ description: 'Zildjian table for 1x1 players' });
table.save(function (err) {
  if (err) {
    winston.error(err);
  } else {
    winston.info('meow');
  }
});

mongoose.connect(process.env.PORT || 'mongodb://localhost/boardgamesresults');

app.listen(process.env.PORT || 3000);
