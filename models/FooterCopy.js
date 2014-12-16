var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Copy = new keystone.List('FooterCopy');

Copy.defaultColumns = 'title, body';

Copy.add({
  title: {
    type: Types.Text
  },
  body: {
    type: Types.Html,
    wysiwyg: true
  }
});

Copy.register();
