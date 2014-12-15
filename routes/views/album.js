var keystone = require('keystone');

module.exports = function(req, res) {

  var view = new keystone.View(req, res),
      locals = res.locals;

  // Set locals
  locals.section = 'gallery';
  locals.filters = {
    album: req.params.album
  };
  locals.data = {
    albums: []
  };

  // Load the albums by sortOrder
  var albumsQuery = keystone
    .list('Gallery')
    .model
    .findOne({ key: locals.filters.album })
    .sort('sortOrder');

  view.query('gallery', albumsQuery);

  // Render the view
  view.render('album');
};
