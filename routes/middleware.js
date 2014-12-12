var keystone = require('keystone'),
    _ = require('underscore'),
    moment = require('moment'),
    _Event = keystone.list('Event'); //Events is a global, so _Events is used

/**
  Initialises the standard view locals

  The included layout depends on the navLinks array to generate
  the navigation in the header, you may wish to change this array
  or replace it with your own templates / logic.
*/
exports.initLocals = function(req, res, next) {
  var locals = res.locals;

  locals.navLinks = [{
    label: 'Home',
    key: 'home',
    href: '/'
  }, {
    label: 'Membership',
    key: 'membership',
    href: '/membership'
  }, {
    label: 'Job Listings',
    key: 'jobs',
    href: '/jobs'
  }, {
    label: 'Photos',
    key: 'gallery',
    href: '/gallery'
  }, {
    label: 'Contact',
    key: 'contact',
    href: '/contact'
  }];


  locals.getStartTime = function(date) {
    return moment(date).format('h:mma');
  };
  locals.getEndTime = function(date) {
    return moment(date).format('h:mma');
  };
  locals.getDate = function(date) {
    return moment(date).format('MMMM D, YYYY');
  };

  _Event
    .model
    .find()
    .sort('-startTime')
    .exec(function(err, events) {
      // TODO: handle error
      locals.user = req.user;
      locals.events = events;
      next();
    });
};


/**
  Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  // Checks to see if any messages exists
  var any = _.any(flashMessages, function(msgs) {
    return msgs.length;
  });

  if (any) {
    res.locals.messages = flashMessages;
  } else {
    res.locals.messages = false;
  }

  next();
};


/**
  Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
};
