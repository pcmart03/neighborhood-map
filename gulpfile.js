var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat');

gulp.task('lint', function() {
  return gulp.src('lib/app/viewmodel.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(['lib/js/app/places.js', 'lib/js/app/viewmodel.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./lib/js/app/'));
});

gulp.task('compress', function() {
  return gulp.src('lib/js/app/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('mapcompress', function() {
  return gulp.src('lib/js/google-maps/map.js')
    .pipe(uglify())
    .pipe(rename('map.min.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('css', function () {
  gulp.src('styles/style.css')
    .pipe(uglifycss({}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('build', ['mapcompress', 'css', 'compress']);

gulp.task('watch', function(){
  gulp.watch('lib/**/*.js', ['scripts']);
  gulp.watch('styles/*.css', ['css']);
});

gulp.task('default', function() {
  // place code for your default task here
});
