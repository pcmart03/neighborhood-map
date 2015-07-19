var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat');

gulp.task('lint', function() {
  return gulp.src('/lib/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(['./lib/js/app/model.js', './lib/js/places.js', './lib/js/viewmodel.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('compress', function() {
  return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('mapcompress', function() {
  return gulp.src('lib/js/google-maps/map.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('css', function () {
  gulp.src('styles/style.css')
    .pipe(uglifycss({}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('build', ['scripts', 'compress', 'mapcompress', 'css']);

gulp.task('watch', function(){
  gulp.watch('lib/**/*.js', ['scripts', 'compress', 'mapcompress']);
  gulp.watch('styles/*.css', ['css']);
});

gulp.task('default', function() {
  // place code for your default task here
});
