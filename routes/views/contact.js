var keystone = require('keystone');

module.exports = function(req, res) {

  var view = new keystone.View(req, res),
      locals = res.locals;

  // Set locals
  locals.section = 'contact';

  // Build query for officers
  var officersQuery = keystone
    .list('Officer')
    .model
    .find()
    .sort('sortOrder');

  // execute officers query and make it available to the view
  view.query('officers', officersQuery);

  view.render('contact');
};
