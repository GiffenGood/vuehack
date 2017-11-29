var gulp = require('gulp');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
//var Server = require('karma').Server;
var clean = require('gulp-clean');
var del = require('del');
var webpack = require('webpack-stream');
//https://www.npmjs.com/package/gulp-typescript
var ts = require("gulp-typescript");
var merge = require('merge2');

var tsProject = ts.createProject("tsconfig.json",
    {
        typescript: require('typescript'),
        declaration: true
    });

gulp.task('clean', function () {
    del("temp");
    // return gulp.src('app/**/*.js', { read: false })
    //     .pipe(clean());
});

gulp.task("build-js", function () {
    var tsResult = tsProject.src()
        .pipe(tsProject())

    return tsResult.js
      //  .pipe(ngAnnotate({ singleQuotes: true }))
        .pipe(gulp.dest("temp"))
});

gulp.task("build-and-package", function (cb) {
    runSequence(
        'build-js',
        ['webpack'],
        cb
    )
});

gulp.task("build", function (cb) {
    runSequence(
        ['clean'],
        ['build-and-package'],       
        cb
    );
});

gulp.task("webpack", function () {
    return gulp
        .src(["temp/**/*.js","!temp/app/testing", "!temp/app/**/*.spec.js"])
        .pipe(webpack({
            output: {
                filename: "bundle.js"
            },
            resolve: {
                alias: {
                  vue: 'vue/dist/vue.esm.js'
                }
              }
        }))
        .pipe(gulp.dest("dist"));
})

gulp.task("webpack-tests", function () {
    return gulp
        .src(["temp/**/*.js"])
        .pipe(webpack({
            output: {
                filename: "test.bundle.js"
            }
        }))
        .pipe(gulp.dest("dist"));
})

gulp.task('test', function (done) {
    return new Server({
        configFile: __dirname + '/karma.conf.js',
        background: true,
        autoWatch: true
    }, done).start();
});

gulp.task('serverTest', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS'],
        reporters: ['junit', 'coverage']
    }, done).start();
});

gulp.task('watch', function (cb) {
    gulp.watch(
        ['src/**/*.ts'],
        ['build-and-package']
    );
    gulp.watch(
        ['app/**/*.tpl.html'],
        ['html2js']
    );
    cb();
});

gulp.task('default', function () {
    return runSequence(
        ['build'],
        'watch');
});