const
  gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , webpackStream = require('webpack-stream')
  , webpack = require('webpack')
  , browserSync = require('browser-sync')
  , webpackDevConf = require('../webpack/webpack.dev.config.js')
  , webpackBuildConf = require('../webpack/webpack.build.config')
  ;


//引用webpack对js进行操作
gulp.task('pack', function () {
  return gulp
    .src(srcPaths.scripts)
    .pipe(plumber())
    .pipe(webpackStream(webpackDevConf, webpack))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('pack:build', function () {
  return gulp
    .src(srcPaths.scripts)
    .pipe(plumber())
    .pipe(webpackStream(webpackBuildConf, webpack))
    .pipe(gulp.dest('build/scripts'));
});



