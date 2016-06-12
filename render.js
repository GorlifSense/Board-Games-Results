'use strict';

var path = require('path');

/**
 * Views.
 */

 var views = require('co-views');

// setup views mapping .html
// to the swig template engine

module.exports = views(path.join(__dirname, '/views'), {
  map: { html: 'swig' }
});
