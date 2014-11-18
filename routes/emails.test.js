var keystone = require('keystone');

module.exports = {
  'enquiry-notification': function(req, res, callback) {
    var Enquiry = keystone.list('Enquiry');

    var newEnquiry = new Enquiry.model({
      name: { first: 'Test', last: 'User' },
      email: 'contact@shpe.com',
      phone: '+61 2 1234 5678',
      enquiryType: 'message',
      message: { md: 'Nice enquiry notification.' }
    });

    callback(null, {
      admin: 'Admin User',
      enquiry: newEnquiry,
      enquiryUrl: '/keystone/enquiries/'
    });
  }
};
