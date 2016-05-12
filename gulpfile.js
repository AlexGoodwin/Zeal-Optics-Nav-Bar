/*jslint node:true */

'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    input = './css/style.css',
    output = './css';

gulp.task('default', function () {
    return gulp.src(input)
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(output));
});