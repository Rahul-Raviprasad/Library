'use strict';

/**
 * Module dependencies
 */
var reviews = require('../controllers/reviews.server.controller');

module.exports = function (app) {
  // Books collection routes
  // app.route('/api/books').all(booksPolicy.isAllowed)
  //   .get(books.list)
  //   .post(books.create);
  app.route('/api/reviews')
    .get(reviews.list)
    .put(reviews.findOneAndUpdate);
    // .post(reviews.create);

  // Single book routes
  app.route('/api/reviews/:bookId')
    .get(reviews.list);
    // .delete(reviews.delete);
    // .put(reviews.findOneAndUpdate);


  // Finish by binding the book middleware
  // app.param('bookId', reviews.findByIdAndUpdate);
};
