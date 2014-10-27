'use strict';

var keystone = require('keystone'),
  Types = keystone.Field.Types,
  https = require('https');

var Event = new keystone.List('Event', { defaultSort: '-startTime' });
Event.defaultColumns = 'FBEventName, startTime';

Event.add({
  FBEventId:     { type: Types.Number, format: false, required: true, initial: true, unique: true },
  FBEventName:   { type: Types.Text },
  description:   { type: Types.Textarea },
  startTime:     { type: Types.Datetime },
  endTime:       { type: Types.Datetime },
  isDateOnly:    { type: Types.Boolean },
  location:      { type: Types.Text },
  ownerName:     { type: Types.Text },
  updatedTime:   { type: Types.Datetime },
  venueName:     { type: Types.Text }, // typically given if lat/long data isn't
  venueCity :    { type: Types.Text },
  venueLat :     { type: Types.Number },
  venueLong :    { type: Types.Number },
  venueState :   { type: Types.Text },
  venueStreet :  { type: Types.Text },
  venueZip :     { type: Types.Number, format: false },
  coverPhoto:    { type: Types.S3File },
  error:         { type: Types.Boolean }
});

Event.schema.pre('save', function(next) {
  var myEvent = this;
  https.get(
    'https://graph.facebook.com/v2.1/' + this.FBEventId +
    '?access_token=' + process.env.FB_ACCESS_TOKEN + '|' + process.env.FB_SECRET,
    function(res) {
      var body = '';
      res.on('data', function(d) { body += d; });
      res.on('end', function() {
        body = JSON.parse(body);
        if (body.error) {
          // TODO prevent completion of event save
          console.log('graphMethodException :(', body.error);
          myEvent.FBEventName = 'graphMethodException';
          myEvent.error = true;
          myEvent.description = 'We\'ve encountered an error with the provided id.' +
            'Double check that the event is public';
        } else {
          myEvent.FBEventName = body.name;
          myEvent.description = body.description;
          myEvent.startTime = body.start_time;
          myEvent.endTime = body.end_time;
          myEvent.is_data_only = body.is_data_only;
          myEvent.location = body.location;
          myEvent.updatedTime = body.updated_time;
          myEvent.ownerName = body.owner.name;
          if (body.venue) {
            if (body.venue.name) {
              myEvent.venueName = body.venue.name;
              myEvent.venueCity = myEvent.venueLat = myEvent.venueLong = null;
              myEvent.venueStreet = myEvent.venueZip = myEvent.venueState = null;
            } else {
              myEvent.venueName = null;
              myEvent.venueCity = body.venue.city;
              myEvent.venueLat = body.venue.latitude;
              myEvent.venueLong = body.venue.longitude;
              myEvent.venueState = body.venue.state;
              myEvent.venueStreet = body.venue.street;
              myEvent.venueZip = body.venue.zip;
            }
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
