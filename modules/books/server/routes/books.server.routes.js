'use strict';

/**
 * Module dependencies
 */
var booksPolicy = require('../policies/books.server.policy'),
  books = require('../controllers/books.server.controller');

module.exports = function (app) {
  // Books collection routes
  app.route('/api/books').all(booksPolicy.isAllowed)
    .get(books.list)
    .post(books.create);

  // Single book routes
  app.route('/api/books/:bookId').all(booksPolicy.isAllowed)
    .get(books.read)
    .put(books.update)
    .delete(books.delete);

  // Finish by binding the book middleware
  app.param('bookId', books.bookByID);
};
