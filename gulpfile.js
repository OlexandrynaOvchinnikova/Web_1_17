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
const imagemin = async () => (await import('gulp-imagemin')).default;

// const path ={
//     styles: {
//         src: 'app/scss/style.scss',
//         dest: 'app/css'
//     },
//     scripts: {
//         src: 'app/js/main.js',
//         dest: 'app/js',
//     },
//     images: {
//         src: 'app/img/**/*.{png,jpg,jpeg,gif,svg}',
//         dest: 'app/images'
//     }
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

//Img
async function img() {
    const imageminModule = await imagemin();
    return src('app/img/**/*')
        .pipe(imageminModule())
        .pipe(dest('app/images/'));
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
        'app/js/main.min.js',
        'app/*.html',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

exports.styles = styles; //turn on func
exports.scripts = scripts;
exports.watching = watching;
exports.browser_sync = browser_sync;
exports.img = img;

exports.build = series(cleanDist, building);
//default
exports.default = parallel(styles, scripts, img, browser_sync, watching);
