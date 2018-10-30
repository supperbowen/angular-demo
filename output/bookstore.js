"use strict";

require("./serivces/book-data-service");

/*global angular*/
(function (angular) {
  "use strict";

  angular.module('bookStoreApp', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/bookstore/list");
    $stateProvider.state('bookstore', {
      url: '/bookstore',
      controller: 'bookStoreMainController',
      templateUrl: './partials/book-main-view.html'
    }).state('bookstore.list', {
      url: '/list',
      controller: 'bookStoreListController',
      templateUrl: './partials/book-list-view.html'
    }).state('bookstore.detail', {
      url: '/detail',
      controller: 'bookStoreDetailController',
      templateUrl: './partials/book-detail-view.html'
    });
  }]);
})(angular);
"use strict";

(function (angular) {
  'use strict';

  var module = angular.module('bookStoreApp');
  module.directive('dContains', [function () {
    return {
      require: 'ngModel',
      link: function link(scope, element, attr, ctrl) {
        var validator = function validator(val) {
          var items = (attr.dContains || '').split(',');
          var validity = items.indexOf(val) !== -1 || ctrl.$isEmpty(val); // 设置 ngModel的验证结果

          ctrl.$setValidity('contains', validity); // 这个值必需返回，否则ngModel不更新了

          return validity ? val : undefined;
        };

        ctrl.$parsers.push(validator); // $parsers由input的值，即用户输入的变化都会触发其中的管道函数

        ctrl.$formatters.push(validator); // ng-model绑定的值发生了变化
      }
    };
  }]);
})(angular);
"use strict";

(function (angular) {
  'use strict';

  var module = angular.module('bookStoreApp');
  module.directive('ddjfColorPicker', [function () {
    return {
      scope: {
        format: '@'
      },
      restrict: 'A',
      require: 'ngModel',
      templateUrl: './directives/color-picker.html',
      link: function link(scope, element, attr, ctrl) {
        var picker = null;
        /**
         * 组件初始化
         */

        var initUI = function initUI() {
          picker = new Pickr({
            el: element.children()[0],
            default: ctrl.$viewValue,
            components: {
              preview: true,
              opacity: true,
              hue: true,
              interaction: {
                hex: true,
                rgba: true,
                hsva: false,
                input: true,
                clear: true,
                save: true
              }
            },

            /**
             * 提效颜色修改
             * @param {*} hsva 颜色对象
             * @param {*} instance
             */
            onSave: function onSave(hsva, instance) {
              var val = hsva ? hsva.toHEX().toString() : '';
              ctrl.$setViewValue(val);
            }
          });
        };
        /**
         * ng-model 发生更新时
         */


        ctrl.$render = function $render() {
          // 这个可能先于界面完成，所以要检测一下
          if (picker) {
            picker.setColor(ctrl.$viewValue);
          }
        }; // setTimeout();


        initUI();
        scope.$on('$destroy', function $destroy() {
          picker.destroyAndRemove();
        });
      }
    };
  }]);
})(angular);
"use strict";

(function (angular) {
  'use strict';

  var module = angular.module('bookStoreApp');
  module.controller('bookStoreDetailController', ['$scope', '$state', 'bookStoreDataService', function ($scope, $state, dataService) {
    $scope.selectedBook = dataService.getSelected();
    $scope.selectedColor = '#FF0000';

    $scope.goList = function goList() {
      $state.go('bookstore.list');
    };

    $scope.resetColor = function resetColor() {
      $scope.selectedColor = '#FF0000';
    };

    $scope.save = function save() {};
  }]);
})(angular);
"use strict";

(function (angular) {
  "use strict";

  var module = angular.module('bookStoreApp');
  module.controller('bookStoreListController', ['$scope', '$state', 'bookStoreDataService', function ($scope, $state, dataService) {
    $scope.loadData = function loadData() {
      dataService.getBooks().then(function (books) {
        $scope.books = books;
        $scope.selected = dataService.getSelected();
      });
    };

    $scope.selectBook = function selectBook(book) {
      dataService.selectBook(book);
      $scope.selected = book;
    };

    $scope.getRowStyle = function getRowStyle(book) {
      if (book === dataService.getSelected()) {
        return 'selectedbook';
      }
    };

    $scope.editBook = function editBook() {
      $state.go('bookstore.detail');
    };

    $scope.loadData();
    $scope.selected = dataService.getSelected();
  }]);
})(angular);
"use strict";

(function (angular) {
  "use strict";

  var module = angular.module('bookStoreApp');
  module.controller('bookStoreMainController', ['$scope', 'bookStoreDataService', function ($scope, bookDataService) {// bookDataService.getList
  }]);
})(angular);