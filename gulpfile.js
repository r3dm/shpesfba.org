'use strict';
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    style = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('autoprefixer-stylus'),
    nib = require('nib');
    //watch = require('gulp-watch');

var started = false;
var paths = {
  stylus: './stylus/style.styl',
  css: './public/styles/',
  js: [
    '**/*.js',
    '!node_modules'
  ],
  jade: './templates/**/*.js'
};

gulp.task('serve', function(cb) {
  nodemon({
  script: './keystone.js',
  ext: 'js',
  watch: [paths.jade],
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
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(style({
      use: [nib(), autoprefixer()],
      'include css': true
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['style']);
});

gulp.task('default', ['serve', 'style', 'watch']);
