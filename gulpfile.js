const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const del = require('del');
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require("gulp-babel");

// Search paths
const files = {
    htmlPath: "src/**/*.html",
    imgPath: "src/**/*.{JPG,jpg,PNG,png,GIF,gif,SVG,svg}",
    sassPath: "src/scss/*.scss",
    jsPath: "src/**/*.js"
}

// Task - Copy HTML
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub'))
    .pipe(browserSync.stream()
    );
}

// Task - Copy images
function copyImg() {
    return src(files.imgPath)
    .pipe(dest('pub'))
    .pipe(browserSync.stream()
    );
}

// Task - SASS to CSS
function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest('pub/css')
        );
 }

// Task -  Concat and minify JavaScript files
function jsConcat() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream()
    );
}

// Task - Delete files from pub
function delPub() {
    return del('pub/**');
}

//Watcher
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });
    
    watch([files.htmlPath, files.imgPath, files.sassPath, files.jsPath],
        parallel(copyHTML, copyImg, sassTask, jsConcat)
    );
}

//Exports to public
exports.default = series(
    delPub,
    parallel(copyHTML, copyImg, sassTask, jsConcat),
    watchTask
);
