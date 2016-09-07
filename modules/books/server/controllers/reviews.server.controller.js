'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Review = mongoose.model('Review'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an book
 */
// exports.create = function (req, res) {
//   var review = new Review(req.body);
//   var newReview = {};
//   review.bookId = req.body.bookId;
//   newReview.reviewerName = req.user.displayName;
//   newReview.reviewerEmail = req.user.email;
//   newReview.comments = req.body.comments;
//   review.reviews.push(newReview);
//   review.save(function (err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(review);
//     }
//   });
// };

/**
 * Show the current book
 */
// exports.read = function (req, res) {
//   // convert mongoose document to JSON
//   var book = req.book ? req.book.toJSON() : {};
//
//   // Add a custom field to the Book, for determining if the current User is the "owner".
//   // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Book model.
//   book.isCurrentUserOwner = !!(req.user && book.user && book.user._id.toString() === req.user._id.toString());
//
//   res.json(book);
// };

/**
 * Update an book
 */
exports.update = function (req, res) {
  // var book = req.book;

  // book.title = req.body.title;
  // book.content = req.body.content;
  // book.status = req.body.status;
  // book.userEmail = req.body.userEmail;
  // book.userName = req.body.userName;
  // book.author = req.body.author;
  // book.publications = req.body.publications;
  // book.category = req.body.category;
  // book.isbn = req.body.isbn;
  // book.possessor = req.body.possessor;
  // book.createdOn = req.body.createdOn;
  // book.createdBy = req.body.createdBy;
  // book.condition = req.body.condition;
  // book.reviewLink = req.body.reviewLink;
  // book.location = req.body.location;
  // book.desc = req.body.desc;
  // book.contributedBy = req.body.contributedBy;
  // book.updatedOn = req.body.updatedOn;
  // book.updatedBy = req.body.updatedBy;
  // book.queueList = req.body.queueList;
  // book.loggedUserRequested = req.body.loggedUserRequested;
  // book.loggedUserQueueNumber = req.body.loggedUserQueueNumber;
  // book.save(function (err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.json(book);
  //   }
  // });
};

/**
 * Delete a Review
 */
exports.delete = function (req, res) {
  var review = req.review;

  review.find({ bookId: req.bookId }, { reviews: { $elemMatch: { reviewId: req.reviewId } } }).remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(review);
    }
  });
};

/**
 * List of Books
 */
exports.list = function (req, res) {
  Review.find({ bookId: req.bookId }).sort('-created').populate('user', 'displayName').exec(function (err, reviews) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(reviews);
    }
  });
};

exports.findOneAndUpdate = function(req, res) {
  console.log('Anoop......');
  // console.log(req);
  console.log(req.body);
  // var bookId = mongoose.Types.ObjectId(req.book._id);
  Review.findOneAndUpdate({ bookId: req.body.bookId },
  { $push: { 'reviews': { comments: req.body.comments } } },
  { safe: true, upsert: true, new: true },
    function(err, model) {
      if (err) {
        console.log(err);
      } else {
        console.log(model);
        console.log('done');
        res.status(200).send(model);
      }
    }
  );
};

/**
 * Book middleware
 */
// exports.bookByID = function (req, res, next, id) {
//
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({
//       message: 'Book Review is invalid'
//     });
//   }
//   console.log(Review.findById(id));
//   Review.findById(id).populate('bookId').exec(function (err, bookReview) {
//     console.log('Id is ---> ' + id);
//     console.log(bookReview);
//     console.log(err);
//     if (err) {
//       return next(err);
//     } else if (!bookReview) {
//       return res.status(404).send({
//         message: 'No review with that identifier has been found'
//       });
//     }
//     req.book = bookReview;
//     next();
//   });
// };
