var keystone = require('keystone'),
  Types = keystone.Field.Types,
  https = require('https');

var Event = new keystone.List('Event');

Event.add({
  FB_event_id:    { type: Types.Number, required: true, initial: true, unique: true },
  name:           { type: Types.Text },
  FB_event_name:  { type: Types.Text },
  description:    { type: Types.Textarea },
  start_time:     { type: Types.Datetime },
  end_time:       { type: Types.Datetime },
  is_date_only:   { type: Types.Boolean },
  location:       { type: Types.Text },
  owner_name:     { type: Types.Text },
  updated_time:   { type: Types.Datetime },
  venue_name:     { type: Types.Text }, // typically given if lat/long data isn't
  venue_city :    { type: Types.Text },
  venue_lat :     { type: Types.Number },
  venue_long :    { type: Types.Number },
  venue_state :   { type: Types.Text },
  venue_street :  { type: Types.Text },
  venue_zip :     { type: Types.Number },
  cover_photo:    { type: Types.S3File }
});

Event.schema.pre('save', function(next) {
  var myEvent = this;
  https.get(
    "https://graph.facebook.com/v2.1/" + this.FB_event_id +
    "?access_token=1540860829462325|w119GKY-gtms6pHnBUIMhAUDun4",
    function(res) {
      var body = '';
      res.on('data', function(d) {
        body += d;
      });
      res.on('end', function() {
        body = JSON.parse(body);
        if (body.type === 'GraphMethodException') {
          // flash to user the error
        } else {
          myEvent.FB_event_name = body.name;
          myEvent.description = body.description;
          myEvent.start_time = body.start_time;
          myEvent.end_time = body.end_time;
          myEvent.is_data_only = body.is_data_only;
          myEvent.location = body.location;
          myEvent.owner_name = body.owner.name;
          myEvent.updated_time = body.updated_time;
          if (body.venue.name) {
            myEvent.venue_name = body.venue.name;
            myEvent.venue_city = null;
            myEvent.venue_lat = null;
            myEvent.venue_long = null;
            myEvent.venue_state = null;
            myEvent.venue_street = null;
            myEvent.venue_zip = null;
          } else {
            myEvent.venue_name = null;
            myEvent.venue_city = body.venue.city;
            myEvent.venue_lat = body.venue.latitude;
            myEvent.venue_long = body.venue.longitude;
            myEvent.venue_state = body.venue.state;
            myEvent.venue_street = body.venue.street;
            myEvent.venue_zip = body.venue.zip;
          }
        }
        next();
      });

    }
  ).on('error', function(e) {
    console.log(e);
  });
});

Event.register();
