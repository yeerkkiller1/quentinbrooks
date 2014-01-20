require.config({
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min', //'lib/jquery',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min', //'lib/underscore',
        knockout: '//ajax.aspnetcdn.com/ajax/knockout/knockout-3.0.0',//'lib/knockout'
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

declare var ENUMS: any;

ENUMS = {};

require(['main'], function (main) {
    
});