(function(angular) {
  'use strict';

  var module = angular.module('bookStoreApp');
  module.controller('bookStoreDetailController', [
    '$scope',
    '$state',
    'bookStoreDataService',
    function($scope, $state, dataService) {
      $scope.selectedBook = dataService.getSelected();
      $scope.selectedColor = '#FF0000';
      $scope.goList = function goList() {
        $state.go('bookstore.list');
      };
      $scope.resetColor = function resetColor() {
        $scope.selectedColor = '#FF0000';
      };
      
      $scope.save = function save() {
          
      };
    }
  ]);
})(angular);
