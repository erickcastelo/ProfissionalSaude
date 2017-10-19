var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean  = require('gulp-clean');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', ['build-css'], function(done) {
   gulp.src('./www/css/*.css')
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('build-css', ['delete-all.css'],function (done) {
  return gulp.src(['!./scss/ionic.app.scss','./scss/all.scss'])
          .pipe(sass())
          .on('error', sass.logError)
          .pipe(gulp.dest('./www/css/'))
          //.on('end', done);
});

gulp.task('delete-all.css', function () {
  return gulp.src('./www/css/*.css')
    .pipe(clean());
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});
