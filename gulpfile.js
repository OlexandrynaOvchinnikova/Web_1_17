// таски для HTML, SCSS, JS та зображень + BrowserSync для перезавантаження сторінки
// задачу default і протестуйте автоматичну обробку файлів та перезавантаження сторінки.

const {dest, src, watch, parallel} = require('gulp');
// const gulp = require("gulp");

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const gulp = require("gulp");
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
// const autoprefixer = require('gulp-autoprefixer');

//SASS
function styles() {
    return src('app/scss/style.scss')
        // .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] })) //for new feature
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'})) //minimization of scss
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
}

//JS
function scripts() {
    return src('app/js/main.js')
        .pipe(concat('main.min.js')) //rename and add
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

//check what new
function watching() {
    watch(['app/scss/style.scss'], styles)
    watch(['app/js/main.js'], scripts)
    watch(['app/*.html']).on('change', browserSync.reload) //for all html
}

//Browser - auto reload
function browser_sync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}


exports.styles = styles; //turn on func
exports.scripts = scripts;
exports.watching = watching;
exports.browser_sync = browser_sync;

//default
exports.default = parallel(styles, scripts, browser_sync, watching);
