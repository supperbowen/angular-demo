const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

exports.lib = function() {
  return (
    src([
    './lib/jquery-3.3.1.min.js', 
    './lib/pickr.min.js', 
    './lib/angular.js', 
    './lib/angular-ui-router.js'])
      .pipe(concat('lib.js'))
      .pipe(dest('./output/'))
  );
};

exports.default = function() {
  return src([
    './demo-1/app.js',
    './demo-1/serivces/*.js',
    './demo-1/filters/*.js',
    './demo-1/validators/*.js',
    './demo-1/directives/*.js',
    './demo-1/controllers/*.js'
  ])
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('bookstore.js'))
    .pipe(dest('./output/'));
};
