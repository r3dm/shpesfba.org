var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
      locals = res.locals;

  // Set locals
  locals.section = 'jobs';

  // Build query for jobs
  var jobsQuery = keystone
    .list('Job')
    .model
    .find()
    .sort('sortOrder');

  // execute officers query and make it available to the view
  view.query('jobs', jobsQuery);

  view.render('jobs');
};
