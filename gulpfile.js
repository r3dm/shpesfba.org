'use strict';
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    style = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    // uncss = require('gulp-uncss'),
    koutoSwiss = require('kouto-swiss');

var started = false;
var paths = {
  stylus: './stylus',
  css: './public/styles/',
  js: [
    '**/*.js',
    '!node_modules'
  ],
  jade: './templates/**/*.jade'
};

gulp.task('serve', function(cb) {
  nodemon({
  script: './keystone.js',
  ext: 'js',
  watch: paths.js,
  env: {
    'NODE_ENV': 'development'
  },
  ignore: ['./core/**']
  //nodeArgs: ['--debug']
  })
    .on('start', function() {
      if (!started) {
        started = true;
        cb();
      }
    });
});

gulp.task('style', function() {
  return gulp.src(paths.stylus + '/style.styl')
    .pipe(plumber())
    .pipe(style({
      use: koutoSwiss(),
      'include css': true,
      sourcemap: { inline: true }
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus + '/*.styl', ['style']);
});

gulp.task('default', ['serve', 'style', 'watch']);
