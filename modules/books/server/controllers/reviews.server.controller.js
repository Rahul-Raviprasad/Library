'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Review = mongoose.model('Review'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * List of Books
 */
exports.list = function (req, res) {
  Review.find({ bookId: req.params.bookId }).exec(function (err, reviews) {
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
  Review.findOneAndUpdate({ bookId: req.body.bookId },
  { $push: { 'reviews': { comments: req.body.comments, reviewerName: req.session.cas.attributes.cn[0], reviewerEmail: req.session.cas.attributes.mail[0] } } },
  { safe: true, upsert: true, new: true },
    function(err, model) {
      if (err) {
        console.log(err);
      } else {
        // console.log(model);
        // console.log('done');
        res.status(200).send(model);
      }
    }
  );
};
