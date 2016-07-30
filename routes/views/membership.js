var keystone = require('keystone'),
    Copy = keystone.list('MembershipCopy');

module.exports = function(req, res, next) {
  var view = new keystone.View(req, res),
      locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'membership';
  locals.signUpUrl = 'https://www.shpeconnect.org';

  Copy
    .model
    .find()
    .exec(function(err, copies) {
      if (err) { return next(err); }
      // Render the view
      locals.copies = copies;
      view.render('membership');
    });
};
