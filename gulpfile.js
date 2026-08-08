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
const browserSync = require('browser-sync').create(); // <--- PŘIDÁNO

const paths = {
    scss: 'app/scss/**/*.scss',
    js: 'app/js/*.js',
    dist: 'dist',
};

// Lokální server s HTTPS (Shoptet běží na https)
function serve(done) {
    browserSync.init({
        server: {
            baseDir: paths.dist,
        },
        port: 3000,
        https: true, // Shoptet vyžaduje HTTPS zdroj pro přesměrování
        cors: true,  // Povolí načítání napříč doménami
        open: false
    });
    done();
}

function styles() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.dist))
        .pipe(browserSync.stream()); // <--- PŘIDÁNO: automaticky injectne nové CSS
}

function scripts() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.dist))
        .pipe(browserSync.stream());
}

function deploy() {
    return src([`${paths.dist}/*.css`, `${paths.dist}/*.js`])
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
            this.emit('end');
        });
}

function watchFiles() {
    watch(paths.scss, styles);
    watch(paths.js, scripts);
}

exports.styles = styles;
exports.scripts = scripts;
exports.deploy = deploy;

// Spustí lokální server a watcher pro okamžité náhledy
// Příkaz: npx gulp dev
exports.dev = series(parallel(styles, scripts), parallel(serve, watchFiles));

exports.default = parallel(styles, scripts);