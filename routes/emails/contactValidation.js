var form = require('express-form');

module.exports = form(
  form
    .field('name')
    .required()
    .trim(),
  form
    .field('email')
    .required()
    .trim()
    .isEmail(),
  form
    .field('message')
    .trim()
    .required()
);
