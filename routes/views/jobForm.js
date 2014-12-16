var keystone = require('keystone'),
    Job = keystone.list('Job');

module.exports = function(req, res) {
  var view = new keystone.View(req, res),
      locals = res.locals;

  locals.section = 'jobs';
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.jobSubmitted = false;

  view.on('post', { action: 'new' }, function(next) {
    if (locals.formData.honeypot) {
      return next(new Error('Robot is trying to spam'));
    }
    var newJob = new Job.model({
      title: locals.formData.title,
      description: locals.formData.description,
      requirements: locals.formData.requirements,

      companyName: locals.formData.companyName,
      companyBlurb: locals.formData.companyBlurb,
      companyUrl: locals.formData.companyUrl,

      location: {
        suburb: locals.formData.city,
        state: locals.formData.state
      },
      expirationDate: locals.formData.expirationDate,
      relocationOffered: locals.formData.relocationOffered,

      email: locals.formData.email
     });

    newJob
      .getUpdateHandler(req)
      .process(req.body, { flashErrors: true }, function(err) {
        if (err) {
          locals.validationErrors = err.errors;
          next();
        } else {
          req.flash(
            'success',
            'Your job has been submitted. Allow 30 days for approval.'
          );
          return res.redirect('/jobs');
        }
      });

  });

  view.render('jobForm', { section: 'jobs' });
 };
