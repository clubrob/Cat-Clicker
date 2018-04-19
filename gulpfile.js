'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function reload(done) {
  browserSync.reload();
  done();
}
function server(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: 'node_modules'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

gulp.task('watchStuff', function() {
  gulp.watch('./sass/**/*.scss', gulp.series('sass', reload));
  gulp.watch('./js/**/*.js', reload);
  gulp.watch('./*.html', reload);
});

gulp.task('serve', gulp.series('sass', server));

gulp.task('default', gulp.parallel('serve', 'watchStuff'));