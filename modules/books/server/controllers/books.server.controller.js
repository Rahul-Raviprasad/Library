'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Book = mongoose.model('Book'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an book
 */
exports.create = function (req, res) {
  var book = new Book(req.body);
  book.user = req.user;
  book.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * Show the current book
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var book = req.book ? req.book.toJSON() : {};

  // Add a custom field to the Book, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Book model.
  book.isCurrentUserOwner = !!(req.user && book.user && book.user._id.toString() === req.user._id.toString());

  res.json(book);
};

/**
 * Update an book
 */
exports.update = function (req, res) {
  var book = req.book;

  book.title = req.body.title;
  book.content = req.body.content;
  book.status = req.body.status;
  book.userEmail = req.body.userEmail;
  book.userName = req.body.userName;
  book.author = req.body.author;
  book.publications = req.body.publications;
  book.category = req.body.category;
  book.isbn = req.body.isbn;
  book.imageURL = req.body.imageURL;
  book.isActive = req.body.isActive;
  book.createdOn = req.body.createdOn;
  book.createdBy = req.body.createdBy;
  book.condition = req.body.condition;
  book.reviewLink = req.body.reviewLink;
  book.location = req.body.location;
  book.desc = req.body.desc;
  book.contributedBy = req.body.contributedBy;
  book.updatedOn = req.body.updatedOn;
  book.updatedBy = req.body.updatedBy;
  book.queueList = req.body.queueList;
  book.loggedUserRequested = req.body.loggedUserRequested;
  book.loggedUserQueueNumber = req.body.loggedUserQueueNumber;
  book.isBookWithAdmin = req.body.isBookWithAdmin;
  book.submitRequestApproved = req.body.submitRequestApproved;
  book.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(book);
    }
  });
};

/**
 * Delete an book
 */
// exports.delete = function (req, res) {
//   var book = req.book;
//
//   book.remove(function (err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(book);
//     }
//   });
// };

/**
 * List of Books
 */
exports.list = function (req, res) {
  // Book.find().sort('-created').populate('user', 'displayName').exec(function (err, books) {
  Book.find({ isActive: true }).sort('-created').exec(function (err, books) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(books);
    }
  });
};

exports.listUnavailableBooks = function (req, res) {
  // Book.find().sort('-created').populate('user', 'displayName').exec(function (err, books) {
  Book.find({ isActive: false }).sort('-created').exec(function (err, books) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(books);
    }
  });
};

/**
 * Book middleware
 */
exports.bookByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Book is invalid'
    });
  }

  Book.findById(id).populate('user', 'displayName').exec(function (err, book) {
    if (err) {
      return next(err);
    } else if (!book) {
      return res.status(404).send({
        message: 'No book with that identifier has been found'
      });
    }
    req.book = book;
    next();
  });
};

exports.changeBookPicture = function (req, res) {
  // var user = req.user;
  var upload = multer(config.uploads.bookImageUpload).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
  // console.log(req);
  // console.log(req.user);
  // console.log(req.body);
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;
  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      // user.profileImageURL = config.uploads.bookImageUpload.dest + req.file.filename;
      res.json(config.uploads.bookImageUpload.dest + req.file.filename);

     // user.save(function (saveError) {
     //   if (saveError) {
     //     return res.status(400).send({
     //       message: errorHandler.getErrorMessage(saveError)
     //     });
     //   } else {
     //     req.login(user, function (err) {
     //       if (err) {
     //         res.status(400).send(err);
     //       } else {
     //         res.json(user);
     //       }
     //     });
     //   }
     // });
    }
  });
  // if (user) {
  //   upload(req, res, function (uploadError) {
  //     if (uploadError) {
  //       return res.status(400).send({
  //         message: 'Error occurred while uploading profile picture'
  //       });
  //     } else {
  //       user.profileImageURL = config.uploads.bookImageUpload.dest + req.file.filename;
  //
  //       // user.save(function (saveError) {
  //       //   if (saveError) {
  //       //     return res.status(400).send({
  //       //       message: errorHandler.getErrorMessage(saveError)
  //       //     });
  //       //   } else {
  //       //     req.login(user, function (err) {
  //       //       if (err) {
  //       //         res.status(400).send(err);
  //       //       } else {
  //       //         res.json(user);
  //       //       }
  //       //     });
  //       //   }
  //       // });
  //     }
  //   });
  // } else {
  //   res.status(400).send({
  //     message: 'User is not signed in'
  //   });
  // }
};
