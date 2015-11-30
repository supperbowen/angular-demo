/*global angular*/
(function (angular) {
	"use strict";

	angular.module('bookStoreApp', []).config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('bookstore', {
				url: '/',
				controller: 'bookMainController',
				template: 'partials/book-main-view.html'
			})
			.state('bookstoreList', {
				url: 'bookstore/list',
				controller: 'bookListController',
				template: 'partials/book-list-view.html'
			})
			.state('bookstoreDetail', {
				url: 'bookstore/detail',
				controller: 'bookDetailController',
				template: 'partials/book-detail-view.html'
			});

	}]);
}(angular));