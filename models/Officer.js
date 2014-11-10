'use strict';

var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Officer = new keystone.List('Officer', { sortable: true });
Officer.defaultColumns = 'name, priority';

Officer.add({
  name:     { type: Types.Name, required: true, initial: true },
  role:     { type: Types.Text },
  bio:      { type: Types.Textarea },
  photo:    { type: Types.CloudinaryImage },
  email:    { type: Types.Email }
});

Officer.register();
