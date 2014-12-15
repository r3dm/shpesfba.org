var keystone = require('keystone');

module.exports = function(req, res) {

  var view = new keystone.View(req, res),
      locals = res.locals;

  // Set locals
  locals.section = 'blog';
  locals.filters = {
    post: req.params.post
  };
  locals.data = {
    posts: []
  };

  // Load the current post
  view.on('init', function(next) {

    keystone
      .list('Post')
      .model
      .findOne({
        state: 'published',
        slug: locals.filters.post
      })
      .populate('author categories')
      .exec(function(err, result) {
        locals.data.post = result;
        next(err);
      });

  });

  // Load other posts
  view.on('init', function(next) {
    keystone
      .list('Post')
      .model
      .find()
      .where('state', 'published')
      .sort('-publishedDate')
      .populate('author')
      .limit('4')
      .exec(function(err, results) {
        locals.data.posts = results;
        next(err);
      });
  });

  view.render('post');
};
