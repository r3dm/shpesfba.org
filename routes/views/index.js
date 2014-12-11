var keystone = require('keystone'),
    Copy = keystone.list('IndexCopy');

exports = module.exports = function(req, res) {
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
      // TODO: Handle error

      locals.copies = copies;
      view.render('index');
    });

};
