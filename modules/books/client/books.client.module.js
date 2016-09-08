(function (app) {
  'use strict';

  app.registerModule('books', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('books.services');
  app.registerModule('reviews.services');
  app.registerModule('bookHistory.services');
  app.registerModule('books.routes', ['ui.router', 'core.routes', 'books.services']);
  app.registerModule('users.services');
  app.registerModule('books.component');
}(ApplicationConfiguration));
