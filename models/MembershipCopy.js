var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Copy = new keystone.List('MembershipCopy');

Copy.defaultColumns = 'title, body, price';

Copy.add({
  title: {
    type: Types.Text
  },
  price: {
    type: Types.Text
  },
  body: {
    type: Types.Html,
    wysiwyg: true
  }
});

Copy.register();
