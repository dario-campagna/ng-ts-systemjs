var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var tsconfig = require('tsconfig-glob');
var filter = require('gulp-filter');
var Server = require('karma').Server;

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['tsconfig-glob'], function () {
    return gulp
        .src(tscConfig.files)
        .pipe(filter(['*', '!*.spec.ts']))
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('compile_tests', ['tsconfig-glob'], function () {
    return gulp
        .src(tscConfig.files)
        .pipe(filter(['*.spec.ts', '*.d.ts']))
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/test'));
});

gulp.task('tsconfig-glob', function () {
    return tsconfig({
        configPath: '.',
        indent: 2
    });
});

// copy dependencies
gulp.task('copy:libs', [], function() {
    return gulp.src([
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/angular/angular.js'
        ])
        .pipe(gulp.dest('dist/lib'))
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', [], function() {
    return gulp.src(['app/**/*', 'index.html', '!app/**/*.ts'], { base : './' })
        .pipe(gulp.dest('dist'))
});

// Run browsersync for development
gulp.task('serve', ['build'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['app/**/*', 'index.html'], ['buildAndReload']);
});

gulp.task('test', ['compile', 'compile_tests'], function() {
    gulp.watch(['app/**/*.ts'], ['compile']);

    gulp.watch(['test/**/*.ts'], ['compile_tests']);

    new Server({
        configFile: __dirname + '/karma.conf.js'
    }).start();
});

gulp.task('build', ['compile', 'copy:libs', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);