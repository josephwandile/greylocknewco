var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require("gulp-babel");
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./src/scss/**/*.scss'],
    es6: ['./src/js/**/*.js']
};

// should be the main command!
gulp.task('default', ['sass', 'babel', 'watch']);

// `gulp serve` is an alias of `gulp watch` for your convenience :)
gulp.task('serve', ['watch']);

// compile sass to css
gulp.task('sass', function(done) {
    gulp.src('./src/scss/ionic.app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

// compile es6 to es5 with babel
gulp.task('babel', function(done) {
    gulp.src('./src/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});

// install bower components
gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

// compile sass and es6 on the fly
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.es6, ['babel']);
});
