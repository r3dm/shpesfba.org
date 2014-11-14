var keystone = require('keystone'),
    Job = keystone.list('Job');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
      locals = res.locals;

  locals.section = 'jobs';
  // locals.jobTypes = Job.fields.jobType.ops;
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.jobSubmitted = false;

  // On POST requests, add the Job item to the database
  view.on('post', { action: 'job' }, function(next) {

    var newJob = new Job.model(),
      updater = newJob.getUpdateHandler(req);

    updater.process(req.body, {
      flashErrors: true,
      fields: 'title, description, requirements, companyName, companyBlurb, companyUrl, location, expirationDate, relocationOffered, email',
      errorMessage: 'There was a problem submitting your job:'
    }, function(err) {
      if (err) {
        locals.validationErrors = err.errors;
      } else {
        locals.jobSubmitted = true;
      }
      next();
    });

  });

  view.render('jobForm');
};
