var keystone = require('keystone'),
  Types = keystone.Field.Types,
  https = require('https');

var Event = new keystone.List('Event', { defaultSort: '-startTime' });

// Specifies what columns to display in AdminUI
Event.defaultColumns = 'FBEventName, startTime';

Event.add({
  FBEventId: {
    type: Types.Number,
    format: false,
    required: true,
    initial: true,
    unique: true
  },
  FBEventName: { type: Types.Text },
  description: { type: Types.Textarea },

  startTime: { type: Types.Datetime },
  endTime: { type: Types.Datetime },

  isDateOnly: { type: Types.Boolean },
  location: { type: Types.Text },
  ownerName: { type: Types.Text },
  updatedTime: { type: Types.Datetime },

  venueName: { type: Types.Text }, // typically given if lat/long data isn't
  venueCity: { type: Types.Text },
  venueLat: { type: Types.Number },
  venueLong: { type: Types.Number },
  venueState: { type: Types.Text },
  venueStreet: { type: Types.Text },
  venueZip: {
    type: Types.Number,
    format: false
  },

  coverPhoto: { type: Types.S3File },
  fetchedFromFB: { type: Types.Boolean },
  error: { type: Types.Boolean }
});

/* This middleware (aka lifecycle callback) is run whenever an
 * event is being saved. And event may trigger this when being first created in the
 * Admin UI. OR when being resaved in the Admin UI (an update in the info).
 */
Event.schema.pre('save', function(next) {
  //TODO: Convert to use .bind(this);
  var myEvent = this;
  if (myEvent.fetchedFromFB) {
    // let it save as normal. Someone must be updating the info from the AdminUI.
    next();
  } else {
    // this is the first time we save the model. Lets fetch data from Facebook
    var apiCall = [
      'https://graph.facebook.com/v2.2/',
      this.FBEventId,
      '?access_token=',
      process.env.FB_ACCESS_TOKEN,
      '|',
      process.env.FB_SECRET
    ].join('');

    console.log('attempting api call:', apiCall);
    console.log('this object', this);

    https.get(apiCall,
      function(res) {
        var body = '';
        res.on('data', function(d) { body += d; });
        res.on('end', function() {
          body = JSON.parse(body);
          if (body.error) {
            var err = new Error(JSON.stringify(body) +
                                'Make sure the Facebook Event is set to "Public"');
            next(err);
          } else {
            myEvent.FBEventName = body.name;
            myEvent.description = body.description;
            /* jshint ignore:start */
            myEvent.startTime = body.start_time;
            myEvent.endTime = body.end_time;
            myEvent.is_data_only = body.is_data_only;
            myEvent.updatedTime = body.updated_time;
            /* jshint ignore:end */
            myEvent.location = body.location;
            myEvent.ownerName = body.owner.name;
            myEvent.fetchedFromFB = true;

            if (body.venue) {
              if (body.venue.name) {
                myEvent.venueName = body.venue.name;
                myEvent.venueCity =
                  myEvent.venueLat =
                  myEvent.venueLong =
                  myEvent.venueStreet =
                  myEvent.venueZip =
                  myEvent.venueState = null;
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
      })
      .on('error', function(e) {
        console.log(e);
      });
  }
});

Event.register();
