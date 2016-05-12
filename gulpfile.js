var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    input = './css/*.scss',
    output = './css';

gulp.task('default', function () {
    return gulp.src(input)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass())
        .pipe(gulp.dest(output));
});
