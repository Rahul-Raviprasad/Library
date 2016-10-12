'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./users/users.authorization.server.controller')
);

module.exports.getDetails = function(req, res) {
  var dName = req.session.cas.attributes.firstname[0] + ' ' + req.session.cas.attributes.lastname[0];
  var userDetails = {
    user: {
      'displayName': dName,
      'roles': [
        'user'
      ],
      'profileImageURL': 'modules/users/client/img/profile/default.png',
      'email': req.session.cas.attributes.mail[0],
      'lastName': req.session.cas.attributes.lastname[0],
      'firstName': req.session.cas.attributes.firstname[0]
    }
  };

  User.find({
    email: req.session.cas.attributes.mail[0]
  }).exec(function (err, admin) {
    if (err) {
      res.send(userDetails);
    } else {
      if (admin && admin.length) {
        userDetails.user.roles.push('admin');
      }
      res.send(userDetails);
    }
  });
};
