'use strict';

const router = require('koa-router')();
const tables = require('./controllers/tables');

const response = {
  'success': true,
  'status': 200
};

// TODO change to more generic
router.get('/', function *versionHint() {

  response.message = `Board-Games-Results API version + ${this.params.version}`;
  this.body = response;

});

router.get('/tables', tables.list);
router.post('/tables', tables.add);
router.get('/tables/:tableId', tables.get);
router.put('/tables/:tableId', tables.edit);
router.delete('/tables/:tableId', tables.remove);

module.exports = router;
