var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var SystemjsBuilder = require('systemjs-builder');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var Server = require('karma').Server;

// clean the contents of the distribution directory
gulp.task('clean_dist', function () {
    return del('dist/**/*');
});

// clean the contents of the production directory
gulp.task('clean_prod', function () {
    return del('prod/**/*');
});

// TypeScript compile
var tsAppProject = typescript.createProject('tsconfig.json');
gulp.task('_compile', [], function () {
    var tsResult = gulp
        .src(['app/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsAppProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

var tsTestProject = typescript.createProject('tsconfig.json');
gulp.task('_compile_tests', [], function () {
    var tsResult = gulp
        .src(['test/**/*.ts', 'typings/**/*.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsTestProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// generate SystemJS self-executing bundle
gulp.task('_bundle', ['_compile'], function(done) {
    var builder = new SystemjsBuilder('dist');

    builder.config({
        packages: {
            app: {
                format: 'register',
                defaultExtension: 'js'
            }
        }
    });

    builder.buildStatic('app/**/*.js', 'prod/bundle.js', {runtime: false, minify: true, sourceMaps: false})
        .then(function() {
            console.log('Build complete');
            done();
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
            done();
        });
});

// copy dependencies
gulp.task('_copy:libs', [], function () {
    return gulp.src([
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/angular/angular.js'
        ])
        .pipe(gulp.dest('dist/lib'))
});

gulp.task('_prod:libs', [], function () {
    return gulp.src([
            'node_modules/angular/angular.js'
        ])
        .pipe(gulp.dest('prod/lib'))
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('_copy:assets', [], function () {
    return gulp.src(['app/**/*', 'index.html', '!app/**/*.ts'], {base: './'})
        .pipe(gulp.dest('dist'))
});

gulp.task('_prod:assets', [], function () {
    return gulp.src(['app/**/*', 'index.html', '!app/**/*.ts'], {base: './'})
        .pipe(gulp.dest('prod'))
});

// inject dependencies script tags
gulp.task('_index', ['_copy:libs', '_copy:assets'], function() {
    return gulp.src('dist/index.html')
        .pipe(inject(gulp.src(['dist/lib/*.js'], {read: false}), {
            starttag: '<!-- libs:js -->',
            endtag: '<!-- libs -->',
            relative: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('_prod:index', ['_prod:libs', '_prod:assets', '_bundle'], function () {
    return gulp.src('prod/index.html')
        .pipe(inject(gulp.src(['prod/*.js'], {read: false}), {
            starttag: '<!-- bundle:js -->',
            endtag: '<!-- bundle -->',
            relative: true
        }))
        .pipe(inject(gulp.src(['prod/lib/*.js'], {read: false}), {
            starttag: '<!-- libs:js -->',
            endtag: '<!-- libs -->',
            relative: true
        }))
        .pipe(gulp.dest('prod'));
});

// run browsersync for development
gulp.task('serve', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['app/**/*', 'index.html'], ['_buildAndReload']);
});

// run browsersync on production version
gulp.task('prod', ['build_prod'], function () {
    browserSync({
        server: {
            baseDir: 'prod'
        }
    });
});

// run tests and watch
gulp.task('test', ['_compile', '_compile_tests'], function () {
    gulp.watch(['app/**/*.ts'], ['_compile']);

    gulp.watch(['test/**/*.ts'], ['_compile_tests']);

    new Server({
        configFile: __dirname + '/karma.conf.js'
    }).start();
});

gulp.task('build', ['_compile', '_index']);
gulp.task('_buildAndReload', ['build'], reload);

gulp.task('build_prod', ['_prod:index']);

gulp.task('default', ['build']);