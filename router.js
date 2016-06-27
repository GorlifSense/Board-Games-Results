'use strict';

const router = require('koa-router')();
const winston = require('winston');
const Boom = require('boom');

const tables = require('./controllers/tables');

const response = {
  'success': true,
  'test': true,
  'status': 200
};

router.get('/', function* () {
  winston.debug(this.params);
  response.message = 'router get version ' + this.params.version + ' test';
  this.body = response;

});

router.get('/tables', tables.list);
router.post('/tables', tables.add);
router.get('/tables/:tableId', tables.get);
router.put('/tables/:tableId', tables.edit);
router.delete('/tables/:tableId', tables.remove);

module.exports = router;
