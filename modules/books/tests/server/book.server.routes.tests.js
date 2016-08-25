'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Book = mongoose.model('Book'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  book;

/**
 * Article routes tests
 */
xdescribe('Book CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new article
    user.save(function () {
      book = {
        title: 'Book Title',
        desc: 'Book Description'
      };

      done();
    });
  });

  it('should be able to save a book if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/books')
          .send(book)
          .expect(200)
          .end(function (bookSaveErr, bookSaveRes) {
            // Handle article save error
            if (bookSaveErr) {
              return done(bookSaveErr);
            }

            // Get a list of articles
            agent.get('/api/books')
              .end(function (booksGetErr, booksGetRes) {
                // Handle article save error
                if (booksGetErr) {
                  return done(booksGetErr);
                }

                // Get articles list
                var books = booksGetRes.body;

                // Set assertions
                (books[0].user._id).should.equal(userId);
                (books[0].title).should.match('Book Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an article if not logged in', function (done) {
    agent.post('/api/books')
      .send(book)
      .expect(403)
      .end(function (bookSaveErr, bookSaveRes) {
        // Call the assertion callback
        done(bookSaveErr);
      });
  });

  it('should not be able to save an book if no title is provided', function (done) {
    // Invalidate title field
    book.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/articles')
          .send(book)
          .expect(400)
          .end(function (bookSaveErr, bookSaveRes) {
            // Set message assertion
            (bookSaveRes.body.message).should.match('Title cannot be blank');

            // Handle article save error
            done(bookSaveErr);
          });
      });
  });

  it('should be able to update a Book if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/books')
          .send(Book)
          .expect(200)
          .end(function (bookSaveErr, bookSaveRes) {
            // Handle article save error
            if (bookSaveErr) {
              return done(bookSaveErr);
            }

            // Update article title
            book.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing article
            agent.put('/api/books/' + bookSaveRes.body._id)
              .send(book)
              .expect(200)
              .end(function (bookUpdateErr, bookUpdateRes) {
                // Handle article update error
                if (bookUpdateErr) {
                  return done(bookUpdateErr);
                }

                // Set assertions
                (bookUpdateRes.body._id).should.equal(bookUpdateRes.body._id);
                (bookUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of books if not signed in', function (done) {
    // Create new article model instance
    var articleObj = new Book(book);

    // Save the article
    articleObj.save(function () {
      // Request articles
      request(app).get('/api/articles')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single article if not signed in', function (done) {
    // Create new article model instance
    var articleObj = new Book(book);

    // Save the article
    articleObj.save(function () {
      request(app).get('/api/articles/' + articleObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', book.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single article with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/articles/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Article is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single article which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent article
    request(app).get('/api/articles/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No article with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an article if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/books')
          .send(book)
          .expect(200)
          .end(function (bookSaveErr, bookSaveRes) {
            // Handle article save error
            if (bookSaveErr) {
              return done(bookSaveErr);
            }

            // Delete an existing article
            agent.delete('/api/books/' + bookSaveRes.body._id)
              .send(book)
              .expect(200)
              .end(function (bookDeleteErr, bookDeleteRes) {
                // Handle article error error
                if (bookDeleteErr) {
                  return done(bookDeleteErr);
                }

                // Set assertions
                (bookDeleteRes.body._id).should.equal(bookSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an article if not signed in', function (done) {
    // Set article user
    book.user = user;

    // Create new article model instance
    var articleObj = new Book(book);

    // Save the article
    articleObj.save(function () {
      // Try deleting article
      request(app).delete('/api/articles/' + articleObj._id)
        .expect(403)
        .end(function (articleDeleteErr, articleDeleteRes) {
          // Set message assertion
          (articleDeleteRes.body.message).should.match('User is not authorized');

          // Handle article error error
          done(articleDeleteErr);
        });

    });
  });

  it('should be able to get a single article that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new article
          agent.post('/api/books')
            .send(book)
            .expect(200)
            .end(function (bookSaveErr, bookSaveRes) {
              // Handle article save error
              if (bookSaveErr) {
                return done(bookSaveErr);
              }

              // Set assertions on new article
              (bookSaveRes.body.title).should.equal(book.title);
              should.exist(bookSaveRes.body.user);
              should.equal(bookSaveRes.body.user._id, orphanId);

              // force the article to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the book
                    agent.get('/api/books/' + bookSaveRes.body._id)
                      .expect(200)
                      .end(function (articleInfoErr, articleInfoRes) {
                        // Handle article error
                        if (articleInfoErr) {
                          return done(articleInfoErr);
                        }

                        // Set assertions
                        (articleInfoRes.body._id).should.equal(bookSaveRes.body._id);
                        (articleInfoRes.body.title).should.equal(book.title);
                        should.equal(articleInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single article if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new article model instance
    book.user = user;
    var articleObj = new Book(book);

    // Save the article
    articleObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = user.id;

          // Save a new article
          agent.post('/api/articles')
            .send(book)
            .expect(200)
            .end(function (articleSaveErr, articleSaveRes) {
              // Handle article save error
              if (articleSaveErr) {
                return done(articleSaveErr);
              }

              // Get the article
              agent.get('/api/articles/' + articleSaveRes.body._id)
                .expect(200)
                .end(function (articleInfoErr, articleInfoRes) {
                  // Handle article error
                  if (articleInfoErr) {
                    return done(articleInfoErr);
                  }

                  // Set assertions
                  (articleInfoRes.body._id).should.equal(articleSaveRes.body._id);
                  (articleInfoRes.body.title).should.equal(book.title);

                  // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                  (articleInfoRes.body.isCurrentUserOwner).should.equal(true);

                  // Call the assertion callback
                  done();
                });
            });
        });
    });
  });

  it('should be able to get a single article if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new article model instance
    var articleObj = new Book(book);

    // Save the article
    articleObj.save(function () {
      request(app).get('/api/articles/' + articleObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', book.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single article, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      username: 'temp',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create temporary user
    var _user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _user.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the Article
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = user._id;

          // Save a new article
          agent.post('/api/articles')
            .send(book)
            .expect(200)
            .end(function (articleSaveErr, articleSaveRes) {
              // Handle article save error
              if (articleSaveErr) {
                return done(articleSaveErr);
              }

              // Set assertions on new article
              (articleSaveRes.body.title).should.equal(book.title);
              should.exist(articleSaveRes.body.user);
              should.equal(articleSaveRes.body.user._id, userId);

              // now signin with the temporary user
              agent.post('/api/auth/signin')
                .send(_creds)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the article
                  agent.get('/api/articles/' + articleSaveRes.body._id)
                    .expect(200)
                    .end(function (articleInfoErr, articleInfoRes) {
                      // Handle article error
                      if (articleInfoErr) {
                        return done(articleInfoErr);
                      }

                      // Set assertions
                      (articleInfoRes.body._id).should.equal(articleSaveRes.body._id);
                      (articleInfoRes.body.title).should.equal(book.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (articleInfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Book.remove().exec(done);
    });
  });
});
