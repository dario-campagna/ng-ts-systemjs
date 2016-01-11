module.exports = function (config) {
    config.set({

        basePath: '',

        files: [
            'dist/**/*.spec.js'
        ],

        systemjs: {
            serveFiles: [
                'dist/**/*.js',
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js'
            ],
            config: {
                baseURL: '',
                transpiler: null,
                defaultJSExtensions: true,
                paths: {
                    'angular': 'node_modules/angular/angular.js',
                    'angular-mocks': 'node_modules/angular-mocks/angular-mocks.js',
                    'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
                    'systemjs': 'node_modules/systemjs/dist/system.js',
                    'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
                }
            }
        },

        frameworks: ['systemjs', 'jasmine'],

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false
    });
};