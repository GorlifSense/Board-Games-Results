'use strict';

const app = require('../app');

describe('Dummy', () => {

  it('should try launch server and testd', () => {
    const mongoUrl = 'mongodb://localhost:27017/boardgamesresults_test';

    app('3001', process.env.MONGO || mongoUrl);

  });

});
