var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Event = new keystone.List('Event');

Event.add({
  FB_event_id:    { type: Types.Number, required: true, initial: true },
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

Event.register();
