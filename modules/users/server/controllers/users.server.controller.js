'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');

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

  res.send(userDetails);
};
