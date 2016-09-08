'use strict';

/**
 * Module dependencies
 */
var history = require('../controllers/reviews.server.controller');

module.exports = function (app) {
  app.route('/api/reviews')
    .put(history.findOneAndUpdate);

  app.route('/api/reviews/:bookId')
    .get(history.list);
};
