const gulp = require('gulp');
const mocha = require('gulp-mocha');
require('babel-core/register');

gulp.task('default', () => {
  return gulp.src('tests/**/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({
      reporter: 'nyan',
      timeout: 30000}
    ));
});