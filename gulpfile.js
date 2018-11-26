var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var plumberNotifier = require('gulp-plumber-notifier');
var jsImport = require('gulp-js-import');
var imagemin = require('gulp-imagemin');


gulp.task('default', ['css', 'js', 'views', 'fonts'], () => {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch("src/fonts/*}", ['fonts']);
  gulp.watch("src/scripts/**/*.js", ['js']);
  gulp.watch("src/scss/**/*.scss", ['css']);
  gulp.watch("src/views/**/*.pug", ['views']);
  gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('fonts', () => {
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('views', () =>
  gulp.src('src/views/pages/*.pug')
  .pipe(plumberNotifier())
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist/'))
);

gulp.task('images', () =>
  gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img/'))
);

gulp.task('js', () => {
  gulp.src('src/scripts/main.js')
    .pipe(plumberNotifier())
    .pipe(jsImport({
      hideConsole: false
    }))
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('css', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumberNotifier())
    .pipe(sass({
      errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('src/fonts/*', [fonts])
  gulp.watch('src/scripts/**/*.js', [js]);
  gulp.watch('src/scss/**/*.scss', [css]);
  gulp.watch('src/views/**/*.pug', [views]);
});