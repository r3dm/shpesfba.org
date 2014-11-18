var keystone = require('keystone'),
    Enquiry = keystone.list('Enquiry');

module.exports = function(req, res, next) {
  var body = req.body,
      message = body.message,
      first = body.name.split(' ')[0],
      last = body.name.split(' ')[1] || '';

  var contact = new Enquiry.model({
    name: {
      first: first,
      last: last
    },
    email: body.email || 'n/a',
    enquiryType: 'message',
    message: { md: message }
  });

  var updater = contact.getUpdateHandler(req, res);

  updater.process(req.body, {}, function(err) {
    if (err) {
      console.log(err);
    } else {
      new keystone.Email('contactGeneral').send({
        to: 'berkeley@robotie.com',
        from: {
          name: contact.name.full,
          email: contact.email
        },
        subject: 'New Message for a vistor at sfbayareashpe.org',
        message: body.message,
        enquiry: contact
      }, function(err, data) {
        if (err) { return next(err); }
        console.log(data);

        res.redirect('/');
      });
    }
  });

};
