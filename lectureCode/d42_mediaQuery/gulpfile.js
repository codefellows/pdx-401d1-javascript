var gulp = require('gulp');
var gulp_jshint = require('gulp-jshint');
var gulp_mocha  = require('gulp-mocha');

var gulp_sass   = require('gulp-sass');
var gulp_rename = require('gulp-rename');
var gulp_uglify = require('gulp-uglify');
var gulp_concat = require('gulp-concat');

var html_src = './*.html';
var js_src   = ['./js/*.js', './test/*.js'];
var gulp_js  = './gulpfile.js';
var ss_src   = ['./css/*.scss', './css/*.sass'];

var del = require('del');
gulp.task('clean', function() {
  console.log("  Deleting './css/*.css', './dist/*', './dist'");
  del(['./css/*.css', './dist/*', './dist']);
});

gulp.task('default', function() { } );

gulp.task('lint', function() {
  return gulp.src(js_src)
    .pipe(gulp_jshint())
    .pipe(gulp_jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(gulp_concat('./all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp_rename('all.min.js'))
    .pipe(gulp_uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
console.log('\n===============\n    gulp task "sass" run\n==============\n');
  return gulp.src(ss_src)
    .pipe(gulp_sass())
    .pipe(gulp.dest('css'));
});

gulp.task('test', function() {
  return gulp.src('./test/test.js', {read: false})
    .pipe(gulp_mocha({reporter: 'spec'}));
});

gulp.task('watch', function() {
  gulp.watch(gulp_js,  ['lint', 'sass', 'test']);
  gulp.watch(ss_src,   ['sass']);
  gulp.watch(js_src,   ['lint', 'test', 'scripts']);
  gulp.watch(html_src, ['test']);
});

gulp.task('default',
          ['lint', 'sass', 'scripts', 'test', 'watch']);
