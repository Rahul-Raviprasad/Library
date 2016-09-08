'use strict';

/**
 * Module dependencies
 */
var history = require('../controllers/reviews.server.controller');

module.exports = function (app) {
  app.route('/api/bookHistory')
    .put(history.findOneAndUpdate);

  app.route('/api/bookHistory/:bookId')
    .get(history.list);
};
