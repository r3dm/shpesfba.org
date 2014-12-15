require('dotenv').load();
var _ = require('underscore'),
    keystone = require('keystone');

keystone.init({
  name: 'shpe',
  brand: 'shpe',

  static: 'public',
  less: null,
  favicon: 'public/favicon.ico',
  views: 'templates/views',
  'view engine': 'jade',

  emails: 'templates/emails',

  'auto update': true,
  session: true,
  'session store': 'mongo',
  'auth': true,
  'user model': 'User',
  'cookie secret':
    'y5g?X/e0X}UnGnBz/)ZnzRTziV=,pmh$9WOIS$[u$wiTEsb~,ng)]|ow%1[!_D:H'
});

// Load your project's Models
keystone['import']('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layout. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: _,
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
  logoSrc: '/images/logo-email.gif',
  logoWidth: 194,
  logoHeight: 76,
  theme: {
    emailBg: '#f9f9f9',
    linkColor: '#2697de',
    buttons: {
      color: '#fff',
      backgroundColor: '#2697de',
      borderColor: '#1a7cb7'
    }
  }
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
  find: '/images/',
  replace: (keystone.get('env') === 'production') ?
    'http://www.sfbayareshpe.org/images/' : 'http://localhost:3000/images/'
}, {
  find: '/keystone/',
  replace: (keystone.get('env') === 'production') ?
    'http://www.sfbayareashpe.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes
keystone.set('email tests', require('./routes/emails.test.js'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  'posts': ['posts', 'post-categories'],
  'galleries': 'galleries',
  'enquiries': 'enquiries',
  'users': 'users'
});

// Amazon s3 storage
keystone.set('s3 config', {
  bucket: process.env.S3_BUCKET,
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();
