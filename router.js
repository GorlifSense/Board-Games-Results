'use strict';

const router = require('koa-router')();
const winston = require('winston');
const Boom = require('boom');

const response = {
  'success': true,
  'test': true,
  'status': 200
};

router.get('/', function* () {
  winston.debug(this.params);
  response.message = 'router get version '+ this.params.version + ' test';
  this.body = response;

});

router.get('/tables', function* () {
  response.message = 'router get table test';
  this.body = response;

});

router.post('/tables', function* () {
  response.message = 'router post table test';
  this.body = response;

});

// router.allowedMethods({
//   'throw': true,
//   notImplemented: () =>
//     new Boom.notImplemented('that method is not implemented'),
//   methodNotAllowed: () =>
//     new Boom.methodNotAllowed('that method is not allowed')
// });

module.exports = router;
