var keystone = require('keystone'),
    Copy = keystone.list('IndexCopy');

module.exports = function(req, res, next) {
  var view = new keystone.View(req, res),
      locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';

  // Find the body copy for this page.
  Copy
    .model
    .find()
    .exec(function(err, copies) {
      if (err) { return next(err); }
      locals.copies = copies;
      view.render('index');
    });

};
