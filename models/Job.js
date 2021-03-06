'use strict';

var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Job = new keystone.List('Job', { defaultSort: '-createdAt' });

Job.defaultColumns = 'title, createdAt, expirationDate';

Job.add({
  title: { type: Types.Text, required: true, initial: true },
  description: { type: Types.Textarea },
  requirements: { type: Types.Textarea },

  companyName: { type: Types.Text },
  companyBlurb: { type: Types.Textarea },
  companyUrl: { type: Types.Url },

  location: { type: Types.Location },
  expirationDate: { type: Types.Date },
  relocationOffered: { type: Types.Boolean },
  email: { type: Types.Email },

  approved: { type: Types.Boolean },
  createdAt: {
    type: Date,
    default: Date.now
  }
 });

Job.register();
