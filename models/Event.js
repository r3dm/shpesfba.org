var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Event = new keystone.List('Event');

Event.add({
  id:             { type: Types.Number,   required: true, index: true },
  name:           { type: Types.Text,     required: true, index: true },
  description:    { type: Types.Textarea, required: true, index: true },
  start_time:     { type: Types.Datetime, required: true, index: true },
  end_time:       { type: Types.Datetime, required: true, index: true },
  is_date_only:   { type: Types.Boolean,  required: false, index: true },
  location:       { type: Types.Text,     required: false, index: true },
  owner_name:     { type: Types.Text,     required: false, index: true },
  updated_time:   { type: Types.Datetime, required: false, index: true },
  venue_name:     { type: Types.Text,     required: false             }, // typically given if lat/long data isn't
  venue_city :    { type: Types.Name,     required: false, index: true },
  venue_lat :     { type: Types.Name,     required: false, index: true },
  venue_long :    { type: Types.Name,     required: false, index: true },
  venue_state :   { type: Types.Name,     required: false, index: true },
  venue_street :  { type: Types.Name,     required: false, index: true },
  venue_zip :     { type: Types.Name,     required: false, index: true }
});

Event.register();
