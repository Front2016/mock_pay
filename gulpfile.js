// Modules dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var bs = browserSync.create('My server');
var nodemon = require('gulp-nodemon');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var config = require('./config');
var path = require('path');

//webpack
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");


//scss/jade编译

var borwserSync = require('browser-sync').create();
var reload = borwserSync.reload;
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

// path 定义
var basedir = './';
var publicdir = './public';
var filepath = {
  'css': path.join(publicdir, 'css/**/*.css'),
  'scss': path.join(basedir, 'sass/**/*.scss'),
  'js': path.join(publicdir, 'js/**/*.js'),
  'view': path.join(basedir, 'views/**/*.jade')
};

// 编译 scss
gulp.task('css', function () {
  return gulp.src(path.join(basedir, 'sass/main.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(publicdir, 'css')))
    .pipe(bs.stream())
});

// dev server
// 启动 express 并添加 browserSync 支持
gulp.task('dev:server', function () {
  nodemon({
    script: 'server.js',
    ignore: ['.vscode', '.idea', 'node_modules'],
    env: {
      'NODE_ENV': 'development'
    }
  });
  bs.init(null, {
    proxy: 'http://localhost:' + config.port,
    files: [filepath.js, filepath.view],
    notify: false,
    open: true,
    port: 3000
  })
});

// 联调服务
gulp.task('api:server', function () {
  nodemon({
    script: 'server.js',
    ignore: ['.vscode', '.idea', 'node_modules'],
    env: {
      'NODE_ENV': 'api',
      'REMOTE_API': config.remoteApi
    }
  });
  bs.init(null, {
    proxy: 'http://localhost:' + config.port,
    files: [filepath.js, filepath.view],
    notify: false,
    open: false,
    port: 5000
  })
});

gulp.task('cssmin', function () {
  return gulp.src(path.join(publicdir, './public/css/main.css'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(publicdir, 'css')))
});

gulp.task('jsmin', function () {
  return gulp.src(filepath.js)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(publicdir, 'js')))
});

gulp.task('transJade', function () {
  return gulp.src('./src/jade/*.jade')
    .pipe(jade({
      pretty: true
    })).pipe(gulp.dest('./public/dist/html'))
});

gulp.task('moveScss', function(){
  return gulp.src('./src/css/*.scss')
    .pipe(gulp.dest('./public/css'));
})


gulp.task('transScss', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('browser-sync', function () {
  borwserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('src/sass/**/*.scss', ['transScss']);
  gulp.watch("*.html").on('change', reload);
});

gulp.task('build', ['cssmin', 'jsmin']);

gulp.task('trans', ['transScss', 'transJade']);

//webpack
gulp.task("webpack", function (callback) {
  var myConfig = Object.create(webpackConfig);
  // run webpack
  webpack(
    // configuration
    myConfig,
    function (err, stats) {
      // if(err) throw new gutil.PluginError("webpack", err);
      // gutil.log("[webpack]", stats.toString({
      //	 // output options
      // }));
      //callback();
    });
});

//log
gulp.task('log', function () {
  var myDate = new Date();
  console.log('project already rebuild' + myDate.toLocaleTimeString());//获取当前时间
});

// watching
gulp.task('watch', function () {
  gulp.watch(filepath.scss, ['css']);
  gulp.watch(['view/**/*.jade', 'app/*.js'], ['webpack', 'log']);
  watcher.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('dev', ['dev:server', 'css', 'transScss', 'transJade', 'webpack', 'watch']);
gulp.task('api', ['api:server', 'css', 'watch']);

gulp.task('compile',['webpack','dev:server','transScss']);

