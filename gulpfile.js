const { src, dest, series, parallel, watch } = require('gulp');

// =====================  Sass  =======================

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

function styleSass() {
    return src('./sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/css'));
}

exports.style = styleSass;

// =====================  resetCSS搬到dist  =======================


function resetCSS() {
    return src('./resetCSS/*.css').pipe(dest('dist/css'))
}

exports.rCSS = resetCSS;

// =====================  HTML  =======================

const fileinclude = require('gulp-file-include');

function html() {
    return src('./*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
}

exports.t = html;

// =====================  搬圖片到dist(開發用)  =======================


function img_origin() {
    return src(['image/*.*', 'image/**/*.*']).pipe(dest('dist/image'))
}

exports.imgO = img_origin;

// =====================  壓縮圖片 之後上線再用  =======================

// const imagemin = require("gulp-imagemin");

// function img() {
//     return src("./image/*.*")
//         .pipe(
//             imagemin([
//                 imagemin.mozjpeg({ quality: 80, progressive: true }), // 壓縮品質  quality越低 -> 壓縮越大 -> 品質越差
//             ])
//         )
//         .pipe(dest("./dist/image/"));
// }

// exports.p = img;


// ====================  搬js到dist  ======================

function jsMove() {
    return src(['js/*.js', 'js/**/*.js']).pipe(dest('dist/js'))
}

exports.jsM = jsMove;

// =====================  瀏覽器同步  =======================

const browserSync = require("browser-sync");
const reload = browserSync.reload;

function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html",
        },
        port: 3000,
    });
    watch(["./sass/*.scss", "./sass/**/*.scss"], styleSass).on("change", reload);
    watch(["./*.html", "./layout/*.html"], html).on("change", reload);
    watch(["./image/*.*", "./image/**/*.*"], img_origin).on("change", reload);
    watch(["./js/*.js", "./js/**/*.js"], jsMove).on("change", reload);
   watch("./resetCSS/*.css", resetCSS).on("change", reload);
    done();
}

exports.default = browser;



exports.dev = series(parallel(html, styleSass, resetCSS, img_origin, jsMove), browser);
