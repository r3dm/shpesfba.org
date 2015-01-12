var _ = require('underscore'),
    keystone = require('keystone'),
    moment = require('moment'),
    Event = keystone.list('Event'),
    Footer = keystone.list('FooterCopy');

module.exports = {
  initLocals: initLocals,
  flashMessages: flashMessages,
  requireUser: requireUser
};
/**
  Initialises the standard view locals

  The included layout depends on the navLinks array to generate
  the navigation in the header, you may wish to change this array
  or replace it with your own templates / logic.
*/
function initLocals(req, res, next) {
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
    label: 'Executive Board',
    key: 'board',
    href: '/executive-board'
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

  Event
    .model
    .find()
    .sort('-startTime')
    .exec()
    .then(function(events) {
      locals.user = req.user;
      locals.events = events;
      return Footer
        .model
        .findById('548fb8b34aefd08a67026203')
        .exec();
    }, next)
    .then(function(about) {
      locals.about = about;
      next();
    }, next);
}


/**
  Fetches and clears the flashMessages before a view is rendered
*/
function flashMessages(req, res, next) {

  var messages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  // Checks to see if any messages exists
  var any = _.any(messages, function(msgs) {
    return msgs.length;
  });

  if (any) {
    res.locals.messages = messages;
  } else {
    res.locals.messages = false;
  }

  next();
}


/**
  Prevents people from accessing protected pages when they're not signed in
 */
function requireUser(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
}
