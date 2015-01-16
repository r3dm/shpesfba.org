var keystone = require('keystone');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
      locals = res.locals;

  locals.section = 'history';

  view.render('history');
};
