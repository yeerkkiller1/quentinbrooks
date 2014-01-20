require.config({
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        knockout: 'lib/knockout'
    },
    shim: {
        jquery: {
            deps: [],
            exports: 'jQuery'
        },
        jqueryui: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        knockout: {
            exports: 'ko'
        }
    },
    baseUrl: '/js'
});

ENUMS = {};

require(['main'], function (main) {
});
