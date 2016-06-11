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
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(serve('public', {
  maxage: 10000
}));

// app.use(route.get('/', tables));

app.use(route.get('/api/tables', getTables));
app.use(route.post('/api/tables', postTables));

/*
// insert Table Schema
var Table = mongoose.model('Table', {
  creationDate: Date,
  description: String,
  game: {
    players: [{
      name: String,
      situation: {
        military: Number,
        gold: Number,
        wonder: Number,
        culture: Number,
        trade: Number,
        guild: Number,
        science: Number
      },
      city: {
        name: String,
        side: String
      }
    }]
  }
});

var tableData = new Table({
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
        name: 'Sparta',
        side: 'A'
      }
    }]
  }
});


tableData.save(function (err) {
  if (err) {
    winston.error(err);
  } else {
    winston.info('meow added');
  }
});
*/

class Table extends Model {

}

// route definitions

/**
 * Get Tables
 */

function *getTables() {
  // var getTables = function*() {
  //   var mPromise = Table.find().exec();
  //   yield mPromise;
  // }
  let tables = yield Table.all();
  this.body =  render('tables', { tables: tables });

  //
  // let tablesData = new Table();
  // var self = this;
  // var callback = function (err, tables) {
  //   if (err) {
  //     winston.error(err);
  //     // yield next;
  //   }
  //   winston.info(tables);
  // }
  // let tablesPromise = yield Table.findOne();
  // winston.debug(tables);
  // self.body = render('tables', { tables: tables });
}

function *postTables() {
  // let table = new Table(this.params);
  //
  // yield table.save();
  // this.body = getTables();
  //

  let post = new Table(yield parse(this));
  winston.info(post);

  // post.created_at = new Date;
  // post.id = id;
  yield post.save();
  this.redirect('/');
}

/**
 * Connect to Mongo
 */
 // Mongorito.connect('localhost/boardgamesresults');
 Mongorito.connect('mongodb://localhost/boardgamesresults');
 //

// mongoose.connect(process.env.MONGO || 'mongodb://localhost/boardgamesresults');

app.listen(process.env.PORT || 3000);
