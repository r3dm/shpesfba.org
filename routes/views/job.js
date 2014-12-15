var keystone = require('keystone');

module.exports = function(req, res) {

  var view = new keystone.View(req, res),
      locals = res.locals;

  // Set locals
  locals.section = 'jobs';
  locals.filters = {
    job: req.params.job
  };

  console.log('id:', locals.filters.job);

  // Build query for job
  var jobQuery = keystone
    .list('Job')
    .model
    .findOne({ _id: locals.filters.job })
    .sort('sortOrder');

  // execute officers query and make it available to the view
  view.query('job', jobQuery);

  view.render('job');
};
