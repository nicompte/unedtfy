var gulp = require('gulp');

gulp.task('peg', function() {
  var peg = require('gulp-peg');
  gulp.src('unedtfy.pegjs')
    .pipe(peg())
    .pipe(gulp.dest('tmp'));
});

gulp.task('build', ['peg'], function () {
  var uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');
  var b = browserify('./unedtfy.js', {
    standalone: 'unedtfy',
    plugin: [
      [ "browserify-derequire" ]
    ]
  });
  return b.bundle()
    .pipe(source('unedtfy.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
  var mocha = require('gulp-mocha');
  return gulp.src('tests/common/*.js')
    .pipe(mocha());
});
