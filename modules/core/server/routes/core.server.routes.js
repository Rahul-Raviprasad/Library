'use strict';

var cas = require('connect-cas');


module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);


  app.route('/check').get(function(req, res, next) {
    res.send(req.session.cas);
  });

  app.route('/adminonly').get(function(req, res, next) {
    res.send(req.session.cas.user);
  });

  // Define application route
  // cas.ssout('/routename'), cas.serviceValidate(), cas.authenticate()
  app.route('/*').get(cas.ssout('/routename'), cas.serviceValidate(), cas.authenticate(), core.renderIndex);


    //  for logout from other apps
  app.route('/signout').post(cas.ssout('/routename'), function(req, res, next) { console.log('hi');});
    // user logout
  app.route('/signout').get(function(req, res, next) {
    console.log('signing out : ' + JSON.stringfy(req));
    if (req.session.destroy) {
      req.session.destroy();
    } else {
      req.session = null;
    }
    res.redirect('https://www.google.com/?custom_normal_logout=1');
  });

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // core.renderIndex

};
