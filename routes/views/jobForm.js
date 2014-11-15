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

  view.on('post', { action: 'new' }, function(next) {
    console.log(locals.formData);
    var newJob = new Job.model({
      title: locals.formData.title,
      description: locals.formData.description,
      requirements: locals.formData.requirements,
      companyName: locals.formData.companyName,
      companyBlurb: locals.formData.companyBlurb,
      companyUrl: locals.formData.companyUrl,
      location: locals.formData.location,
      expirationDate: locals.formData.expirationDate,
      relocationOffered: locals.formData.relocationOffered,
      email: locals.formData.email
    });
    var updater = newJob.getUpdateHandler(req);

    updater.process(req.body, {
      flashErrors: true
    }, function(err) {
      if (err) {
        locals.validationErrors = err.errors;
      } else {
        req.flash('success', 'Your job has been submitted. Allow 30 days for approval');

        return res.redirect('/jobs');
      }
      next();
    });
  });

  view.render('jobForm', { section: 'jobs' });
};
