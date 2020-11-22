const gulp = require('gulp');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

const vendorsScripts = [
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'dev/static/js/vendor/jquery-3.3.1.min.js'
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulpif(argv.prod, minify()))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};
