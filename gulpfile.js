var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    input = './css/**/*.scss',
    output = './css';

gulp.task('css', function() {
    return gulp.src(input)
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest(output));
});

gulp.task('watch', ['css'], function() {
    gulp.watch(input, ['css']);
});
