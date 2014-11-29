var app = angular.module('UrlPay', ['ngResource', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('send', {
            url: '/send',
            templateUrl: 'views/send.html',
            controller: 'SendCtrl'
        })
        .state('receive', {
            url: '/receive',
            templateUrl: 'views/receive.html',
            controller: 'ReceiveCtrl'
        })
});