const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('default', () => {
  return gulp.src('tests/**/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 30000}
    ));
});

gulp.task('light', () => {
  return gulp.src('tests/**/*light*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 30000}
    ));
});

gulp.task('buzzer', () => {
  return gulp.src('tests/**/*buzzer*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 30000}
    ));
});