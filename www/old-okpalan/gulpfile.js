const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const { rimraf } = require('rimraf');
const inject = require('gulp-inject');
const glob = require('glob');
const sortStream = require('sort-stream');
const through2 = require('through2');


// Enhanced paths configuration with globs
const paths = {
    src: {
        base: 'src',
        pages: 'src/pages/**/*.html',
        scss: 'src/styles/**/*.scss',
        mainScss: 'src/styles/main.scss',
        js: {
            all: 'src/js/**/*.js',
            main: 'src/js/main.js',
            pageSpecific: {
                brachistochrone: 'src/js/brachistochrone.js',
                collatz: 'src/js/collatz.js'
            }
        },
        assets: 'src/assets/**/*'
    },
    dist: {
        base: 'dist',
        pages: 'dist',
        css: 'dist/css',
        js: 'dist/js',
        assets: 'dist/assets'
    },
    watch: {
        pages: 'src/pages/**/*.html',
        scss: 'src/styles/**/*.scss',
        js: 'src/js/**/*.js',
        assets: 'src/assets/**/*'
    },
    externals: {
        scripts: [
            'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js'
        ]
    }
};
// Clean task
const clean = () => rimraf(paths.dist.base);

const appendSecurityHeaders = () => {
    return gulp.src(`${paths.dist.base}/**/*.html`)
        .pipe(through2.obj(function(file, enc, cb) {
            if (file.isNull()) {
                return cb(null, file);
            }

            let content = file.contents.toString();
            // Updated CSP header to properly allow D3.js from CDN
            const cspHeader = `
    <meta http-equiv="Content-Security-Policy" 
          content="default-src 'self'; 
                   script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://d3js.org;
                   style-src 'self' 'unsafe-inline';
                   img-src 'self' data: https:;
                   font-src 'self';
                   connect-src 'self';">`;

            content = content.replace('</head>', `${cspHeader}\n</head>`);
            file.contents = Buffer.from(content);
            
            this.push(file);
            cb();
        }))
        .pipe(gulp.dest(paths.dist.base));
};

// Enhanced pages task with injection
const pages = () => {
    const cssFiles = glob.sync(`${paths.dist.css}/**/*.css`);
    const jsFiles = glob.sync(`${paths.dist.js}/**/*.js`);
    
    const sortFiles = (a, b) => {
        const order = ['utils.js', 'main.js'];
        const fileA = a.history[0].split('/').pop();
        const fileB = b.history[0].split('/').pop();
        
        const indexA = order.indexOf(fileA);
        const indexB = order.indexOf(fileB);
        
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        return fileA.localeCompare(fileB);
    };

    const sources = gulp.src([...cssFiles, ...jsFiles].map(file => file), { read: false })
        .pipe(sortStream(sortFiles));

    return gulp.src(paths.src.pages)
        .pipe(through2.obj(function(file, enc, cb) {
            // Add external dependencies before closing head tag
            let content = file.contents.toString();
            // Updated to include both CDN sources for D3.js
            const externalDeps = `
    <!-- External Dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
    <script src="https://d3js.org/d3.v7.min.js" onerror="fallbackD3()"></script>
    <script>
        function fallbackD3() {
            if (typeof d3 === 'undefined') {
                console.warn('Primary D3 source failed, loading fallback...');
                var script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
                document.head.appendChild(script);
            }
        }
    </script>
</head>`;
            content = content.replace('</head>', externalDeps);
            file.contents = Buffer.from(content);
            cb(null, file);
        }))
        .pipe(inject(sources, {
            ignorePath: paths.dist.base,
            addRootSlash: true,
            transform: function(filePath, file, index, length, targetFile) {
                // ... (rest of the transform function remains the same) ...
            }
        }))
        .pipe(gulp.dest(paths.dist.pages))
        .pipe(browserSync.stream());
};

// Enhanced server task
const serve = () => {
    browserSync.init({
        server: {
            baseDir: paths.dist.base,
            middleware: function(req, res, next) {
                // Updated CSP header in middleware to match the one in HTML
                res.setHeader('Content-Security-Policy', 
                    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://d3js.org; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self';");
                next();
            }
        },
        port: 8082,
        open: true,
        notify: false
    });
};


        
// Enhanced styles task
const styles = () => {
    return gulp.src(paths.src.mainScss)
        .pipe(sass({
            includePaths: glob.sync('src/styles/**/')
        }).on('error', function(err) {
            console.error('SASS Error:', err.message);
            this.emit('end');
        }))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
};

// Enhanced scripts task
const scripts = () => {
    return gulp.src(paths.src.js.all)
        .pipe(terser().on('error', function(err) {
            console.error('JavaScript Error:', err.message);
            this.emit('end');
        }))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream());
};

// Assets task
const assets = () => {
    return gulp.src(paths.src.assets)
        .pipe(gulp.dest(paths.dist.assets))
        .pipe(browserSync.stream());
};



// Enhanced watch task
const watch = () => {
    gulp.watch(paths.watch.pages, gulp.series(scripts, styles, pages));
    gulp.watch(paths.watch.scss, styles);
    gulp.watch(paths.watch.js, gulp.series(scripts, pages));
    gulp.watch(paths.watch.assets, assets);
};

// Enhanced verify task
const verify = (done) => {
    const fs = require('fs');
    const criticalFiles = [
        ...glob.sync(`${paths.dist.base}/*.html`),
        ...glob.sync(`${paths.dist.css}/*.css`),
        ...glob.sync(`${paths.dist.js}/*.js`)
    ];
    
    let allFilesExist = true;
    criticalFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            console.error(`❌ Missing: ${file}`);
            allFilesExist = false;
        } else {
            const stats = fs.statSync(file);
            const fileSizeKB = stats.size / 1024;
            console.log(`✓ Found: ${file} (${fileSizeKB.toFixed(2)} KB)`);
        }
    });

    if (!allFilesExist) {
        done(new Error('Build verification failed'));
    } else {
        console.log('✨ Build verification successful!');
        done();
    }
};

// Development task
const dev = gulp.series(
    clean,
    gulp.parallel(styles, scripts, assets),
    pages,
    gulp.parallel(serve, watch)
);

// Production build task
const build = gulp.series(
    clean,
    gulp.parallel(styles, scripts, assets),
    pages,
    appendSecurityHeaders,
    verify
);


// Export tasks
exports.clean = clean;
exports.pages = pages;
exports.styles = styles;
exports.scripts = scripts;
exports.assets = assets;
exports.verify = verify;
exports.build = build;
exports.default = dev;