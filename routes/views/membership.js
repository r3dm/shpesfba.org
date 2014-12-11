var keystone = require('keystone'),
    Copy = keystone.list('MembershipCopy');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
      locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'membership';
  locals.signUpUrl = [
    'https://oneshpe.shpe.org/wps/portal/national/kcxml/',
    '04_Sj9SPykssy0xPLMnMz0vM0Y_QjzKLN48PDQHJgFg',
    '-ofqRaCIhcJEgfW99X4_83FT9AP2C3NCIckdHRQAT8ETZ/',
    'delta/base64xml/L3dJdyEvd0ZNQUFzQUMvNElVRS82XzdfVVU!'
  ].join('');

  Copy
    .model
    .find()
    .exec(function(err, copies) {
      // TODO: Handle err
      // Render the view
      locals.copies = copies;
      view.render('membership');
    });

};
