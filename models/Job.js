'use strict';

var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Job = new keystone.List('Job');
Job.defaultColumns = 'title, expirationDate';

Job.add({
  title:          { type: Types.Text, required: true, initial: true },
  description:    { type: Types.Textarea },
  location:       { type: Types.Location },
  expirationDate: { type: Types.Date },
  email:          { type: Types.Email }
});

Job.register();
