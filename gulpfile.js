'use strict';
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    style = require('gulp-stylus'),
    nib = require('nib'),
    watch = require('gulp-watch');

var paths = {
  stylus: './content/themes/vimal-suite/assets/stylus/',
  css: './content/themes/vimal-suite/assets/css/',
  js: './content/themes/vimal-suite/js/',
  hbs: './content/themes/vimal-suite/'
};

gulp.task('serve', function(cb) {
  nodemon({
  script: 'index.js',
  ext: 'js hbs',
  watch: [paths.hbs],
  env: {
    'NODE_ENV': 'development'
  },
  ignore: ['./core/**']
  //nodeArgs: ['--debug']
  })
   .on('start', cb)
   .on('restart', function() {
     console.log('Restart, yo');
   });
});

gulp.task('style', function() {
  return gulp.src(paths.stylus + '**/*.styl')
    .pipe(style({
      use: nib()
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus + '**/*.styl', [style]);
});

gulp.task('default', ['serve', 'style']);
