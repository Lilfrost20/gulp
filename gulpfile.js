const {src, dest, series, parallel, watch} = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const include = require('gulp-file-include')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const del = require('del')
const ttf2woff2 = require('gulp-ttf2woff2')
const imagemin = require('gulp-imagemin')

function server() {
    browserSync.init({
        server:{
            baseDir: 'dist'
        },
        notify: false
    })
      watch('src/**.scss', style)
      watch('src/*.html', html)
    watch('src/*.{jpg,png,svg,gif,ico,webp}', images)
}

function html() {
    return src('src/index.html')
        .pipe(include())
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

function style() {
    return src('src/**.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('style.css'))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}
function images() {
    return src('src/img/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}

function fonts() {
    return src('src/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts'))
}

function clear() {
    return del('dist')
}




exports.image = images
exports.fonts = fonts
exports.default = series(clear, parallel(html,style), server)