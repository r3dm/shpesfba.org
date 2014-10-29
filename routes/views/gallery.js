var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'gallery';

  // Load the galleries by sortOrder
  var galleryQuery = keystone
    .list('Gallery')
    .model
    .find()
    .sort('sortOrder');

  view.query('galleries', galleryQuery);

  // Render the view
  view.render('gallery');
};
