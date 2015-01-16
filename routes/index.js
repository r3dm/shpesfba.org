var debug = require('debug')('shpe:routes:index'),
    keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname),
    routes = {
      views: importRoutes('./views'),
      emails: importRoutes('./emails')
    },
    sm = require('sitemap');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function(req, res) {
  res
    .status(404)
    .render('404');
});

keystone.set('500', function(err, req, res, next) { /* jshint ignore:line */
  debug('Server Error', err);
  res
    .status(500)
    .render('500');
});

// Sitemap
var sitemap = sm.createSitemap({
  hostname: 'http://shpesfba.org/',
  cacheTime: 600000,
  urls: [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/gallery', changefreq: 'weekly', priority: '1.0' },
    { url: '/executive-board', changefreq: 'monthly', priority: '0.5' },
    { url: '/chapter-history', changefreq: 'monthly', priority: '0.5' },
    { url: '/membership', changefreq: 'monthly', priority: '0.5' },
    { url: '/jobs', changefreq: 'weekly', priority: '0.5' }
  ]
});

// Setup Route Bindings
module.exports = function(app) {

  // Views
  app.get('/', routes.views.index);
  app.get('/gallery', routes.views.gallery);
  app.get('/gallery/:album', routes.views.album);
  app.all('/executive-board', routes.views.contact);
  app.all('/chapter-history', routes.views.history);
  app.all('/membership', routes.views.membership);
  app.get('/jobs', routes.views.jobs);
  app.get('/jobs/new', routes.views.jobForm);
  app.post('/jobs/new', routes.views.jobValidate, routes.views.jobForm);
  app.get('/jobs/:job', routes.views.job);

  app.get('/sitemap.xml', function(req, res) {
    sitemap.toXML( function(xml) {
      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });

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
