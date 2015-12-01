/*global angular*/
(function (angular) {
    "use strict";

    angular.module('bookStoreApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/bookstore/list");

        $stateProvider
            .state('bookstore', {
                url: 'bookstore/',
                controller: 'bookStoreMainController',
                template: './partials/book-main-view.html'
            })
            .state('bookstoreList', {
                url: 'bookstore/list',
                controller: 'bookStoreListController',
                template: './partials/book-list-view.html'
            })
            .state('bookstoreDetail', {
                url: 'bookstore/detail',
                controller: 'bookStoreDetailController',
                template: './partials/book-detail-view.html'
            });

    }]);
}(angular));