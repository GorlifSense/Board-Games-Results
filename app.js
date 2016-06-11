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


// insert dump data
var Table = mongoose.model('Table', { description: String });

var table = new Table({
  creationDate: new Date(),
  description: 'Zildjian table for 1x1 players Dump data',
  game: {
    players: [{
      name: 'Red Cat Evgeniy',
      situation: {
        military: -6,
        gold: 8,
        wonder: 3,
        culture: 0,
        trade: 6,
        guild: 5,
        science: 36
      },
      city: {
        name: 'Sparta'
        side: 'A'
      }
    }]
  });

table.save(function (err) {
  if (err) {
    winston.error(err);
  } else {
    winston.info('meow added');
  }
});

mongoose.connect(process.env.MONGO || 'mongodb://localhost/boardgamesresults');

app.listen(process.env.PORT || 3000);
