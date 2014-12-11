var keystone = require('keystone'),
    _Event = keystone.list('Event'),
    Copy = keystone.list('IndexCopy');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
      locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';

  var copyQuery = Copy.model.find();

  _Event.model.find()
    .sort('-startTime')
    .exec(function(err, events) {
      // TODO: handle error
      locals.user = req.user;
      locals.events = events;

      copyQuery.exec(function(err, copies) {
        // TODO: Handle error
        // Render the view
        locals.copies = copies;
        view.render('index');
      });

    });
};
