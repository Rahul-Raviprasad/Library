'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BookHistory = mongoose.model('BookHistory'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * List of Books
 */
exports.list = function (req, res) {
  BookHistory.find({ bookId: req.params.bookId }).exec(function (err, history) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(history);
    }
  });
};

exports.findOneAndUpdate = function(req, res) {
  BookHistory.findOneAndUpdate({ bookId: req.body.bookId },
  { $push: { 'history': { action: req.body.actionTaken, comments: req.body.comments } } },
  { safe: true, upsert: true, new: true },
    function(err, model) {
      if (err) {
        // console.log('error');
        console.log(err);
      } else {
        // console.log(model);
        // console.log('done');
        res.status(200).send(model);
      }
    }
  );
};
