var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname),
    routes = {
      views: importRoutes('./views'),
      emails: importRoutes('./emails')
    };

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function(req, res) {
  res
    .status(404)
    .render('404');
});

keystone.set('500', function(err, req, res, next) { /* jshint ignore:line */
  res
    .status(500)
    .render('500');
});

// Setup Route Bindings
module.exports = function(app) {

  // Views
  app.get('/', routes.views.index);
  app.get('/gallery', routes.views.gallery);
  app.get('/gallery/:album', routes.views.album);
  app.all('/contact', routes.views.contact);
  app.all('/membership', routes.views.membership);
  app.get('/jobs', routes.views.jobs);
  app.get('/jobs/new', routes.views.jobForm);
  app.post('/jobs/new', routes.views.jobValidate, routes.views.jobForm);
  app.get('/jobs/:job', routes.views.job);

  app.post(
    '/contact-general',
    routes.emails.contactValidation,
    routes.emails.contactGeneral
  );

  app.get('/404', function(req, res) {
    res.render('404');
  });

  app.get('/500', function(req, res) {
    res.render('500');
  });
};
