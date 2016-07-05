'use strict';

const path = require('path');

/**
 * Views.
 */

const views = require('co-views');

// setup views mapping .html
// to the template engine

module.exports = views(path.join(__dirname, '/views'), {
  map: {html: 'swig'}
});
