'use strict';

/**
 * Module dependencies
 */
var reviews = require('../controllers/reviews.server.controller');

module.exports = function (app) {
  app.route('/api/reviews')
    .put(reviews.findOneAndUpdate);

  app.route('/api/reviews/:bookId')
    .get(reviews.list);
};
