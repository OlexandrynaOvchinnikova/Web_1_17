// таски для HTML, SCSS, JS та зображень + BrowserSync для перезавантаження сторінки
// задачу default і протестуйте автоматичну обробку файлів та перезавантаження сторінки.

const {dest, src, watch, parallel, series} = require('gulp');
//series - one BY one

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const gulp = require("gulp");
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const include = require('gulp-include');
const {encode} = require("ini");

// const fonter = require('gulp-fonter');
// const ttf2woff2 = require('ttf2woff2');

// function fonts(){
//     return src('app/fonts/src/*.*')
//         .pipe(fonter({
//             formats: ['woff', 'ttf']
//         }))
//         .pipe(src('app/fonts/*.ttf'))
//         .pipe(ttf2woff2())
//         .pipe(dest('app/fonts'));
// }

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

// //HTML
// function included() {
//     return src('app/pages/*.html')
//         .pipe(include({
//             include: ['app/components']
//         }))
//         .pipe(dest('app'))
//         .pipe(browserSync.stream())
// }

//check what new + Browser_sync
function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/scss/style.scss'], styles)
    watch(['app/images/src'], images)
    watch(['app/js/main.js'], scripts)
    // watch(['app/components/*', 'app/pages/*'], included)
    watch(['app/*.html']).on('change', browserSync.reload) //for all html
}

//clean file dist before build
function cleanDist() {
    return src('dist')
        .pipe(clean());
}

//transfer done files to dist
function building(){
    return src([
        'app/css/style.min.css',
        '!app/images/dist/*.svg',
        'app/images/dist/*.*',
        // 'app/fonts/*.*',
        'app/js/main.min.js',
        'app/**/*.html',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

// Img
function images() {
    return src('app/images/src/*.*', { encoding: false })
        .pipe(newer('app/images/dist'))
        .pipe(imagemin({
            }, { verbose: true }))
        .pipe(dest('app/images/dist'))
}

exports.styles = styles; //turn on func
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.building = building;
// exports.included = included;
// exports.fonts = fonts;


exports.build = series(cleanDist, building);
//default
exports.default = parallel(styles, images, scripts, watching);
