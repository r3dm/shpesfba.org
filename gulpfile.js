'use strict';
var gulp = require('gulp'),

    // # utils
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // # css
    //uncss = require('gulp-uncss'),
    style = require('gulp-stylus'),
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

gulp.task('js:concat', function() {
  return gulp.src([
    './public/js/lib/jquery/jquery-2.1.1.js',
    './public/js/lib/bootstrap/bootstrap.js',
    './public/js/lib/pickadate/picker.js',
    './public/js/lib/pickadate/picker.date.js',
    './public/js/shpe-main.js',
    './public/js/lib/slick.js',
    './public/js/lib/blueimp/blueimp-gallery.js',
    './public/js/lib/blueimp/jquery.blueimp-gallery.js',
    './public/js/lib/bootstrap/bootstrap-image-gallery.js',
    './public/js/lib/bootstrap/bootstrapValidator.js'
  ])
  .pipe(concat('shpe.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./public/js'));
});

gulp.task('css:concat', ['style'], function() {
  return gulp.src([
    './public/styles/style.css',
    './public/styles/lib/slick.css',
    './public/styles/lib/blueimp-gallery.css',
    './public/styles/lib/bootstrap-image-gallery.css',
    './public/styles/lib/bootstrapValidator.css'
  ])
  .pipe(concat('shpe.css'))
  .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', ['serve', 'style', 'watch']);
gulp.task('production', ['style', 'js:concat', 'style:concat']);
