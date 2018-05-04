const gulp = require('gulp')
const sass = require('gulp-sass')
const clean = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const uglifyjs = require('uglify-es')
const composer = require('gulp-uglify/composer')
const rename = require('gulp-rename')
const uglify = composer(uglifyjs, console)


gulp.task('compressjs', () => {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js/min'))
        .pipe(browserSync.reload())
})

gulp.task('sass', () => {
    gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('reload', ['sass', 'compressjs'], () => {
    browserSync.reload({
        stream: true
    })
})

gulp.task('watch', ['browser-sync', 'sass', 'compressjs'], () => {
    gulp.watch('styles/*.scss', ['sass', 'reload'])
    gulp.watch('js/*.js', ['compressjs', 'reload'])
    gulp.watch('./**/*.html', ['reload'])
})

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
})