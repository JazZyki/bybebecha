require('dotenv').config();

const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sftp = require('gulp-sftp-up4');
const log = require('fancy-log');

// --------------------
// Konfigurace cest
// --------------------
const paths = {
    scss: 'app/scss/**/*.scss',
    js: 'app/js/*.js',
    dist: 'dist',
};

// --------------------
// Styly (SASS -> CSS)
// --------------------
function styles() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.dist));
}

// --------------------
// Skripty (JS)
// --------------------
function scripts() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.dist));
}

// --------------------
// SFTP Deploy (Shoptet)
// --------------------
function deploy() {
    return src(`${paths.dist}/**/*`)
        .pipe(sftp({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            pass: process.env.FTP_PASS,
            remotePath: process.env.FTP_PATH || '/',
            port: 22,
            createDirectories: true,
        }))
        .on('error', function(err) {
            log.error('SFTP Chyba:', err.message);
            this.emit('end'); // Důležité: zabrání pádu Gulp watcheru při chybě
        });
}

// --------------------
// Watchery
// --------------------

// Standardní lokální watcher
function watchFiles() {
    watch(paths.scss, styles);
    watch(paths.js, scripts);
}

// Watcher, který po každé změně provede build a hned nahrává
function watchAndDeploy() {
    // Sleduje změny, spustí build (styles/scripts) a následně deploy
    watch(paths.scss, series(styles, deploy));
    watch(paths.js, series(scripts, deploy));
}

// --------------------
// Exporty (příkazy pro terminál)
// --------------------

exports.styles = styles;
exports.scripts = scripts;
exports.deploy = deploy;

// Spustí build a pak hlídá změny (pouze lokálně)
// Příkaz: npx gulp dev
exports.dev = series(parallel(styles, scripts), watchFiles);

// Spustí build a hlídá změny + hned nahrává na SFTP
// Příkaz: npx gulp watchDeploy
exports.watchDeploy = series(parallel(styles, scripts), watchAndDeploy);

// Výchozí úkol (pouze build)
// Příkaz: npx gulp
exports.default = parallel(styles, scripts);