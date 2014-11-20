var form = require('express-form');

module.exports = form(
  form.field('title')
    .required()
    .trim(),
  form.field('description')
    .required()
    .trim(),
  form.field('requirements')
    .required()
    .trim(),
  form.field('companyName')
    .required()
    .trim(),
  form.field('companyBlurb')
    .required()
    .trim(),
  form.field('companyUrl')
    .required()
    .trim()
    .isUrl(),
  form.field('location.city')
    .required()
    .trim(),
  form.field('location.state')
    .required()
    .trim(),
  form.field('email')
    .required()
    .trim()
    .isEmail(),
  form.field('relocationOffered')
    .required()
    .trim()
    .toBoolean()
);
