var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'album'; //TODO make this a navbar item?
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

  // Load the current post
  // view.on('init', function(next) {

  //   var q = keystone.list('Post').model.findOne({
  //     state: 'published',
  //     slug: locals.filters.post
  //   }).populate('author categories');

  //   q.exec(function(err, result) {
  //     locals.data.post = result;
  //     next(err);
  //   });
  // });

  // Load other posts
  // view.on('init', function(next) {
  //   var q = keystone
  //     .list('Post')
  //     .model
  //     .find()
  //     .where('state', 'published')
  //     .sort('-publishedDate')
  //     .populate('author')
  //     .limit('4');

  //   q.exec(function(err, results) {
  //     locals.data.posts = results;
  //     next(err);
  //   });
  // });

  // Render the view
  view.render('album');
};
