(function(angular) {
  'use strict';
  var module = angular.module('bookStoreApp');

  module.directive('dContains', [
    function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
          var validator = function validator(val) {
            let items = (attr.dContains || '').split(',');
            let validity = items.indexOf(val) !== -1 || ctrl.$isEmpty(val);
            // 设置 ngModel的验证结果
            ctrl.$setValidity('contains', validity);
            // 这个值必需返回，否则ngModel不更新了
            return validity ? val : undefined;
          };

          ctrl.$parsers.push(validator); // $parsers由input的值，即用户输入的变化都会触发其中的管道函数
          ctrl.$formatters.push(validator); // ng-model绑定的值发生了变化
        }
      };
    }
  ]);
})(angular);
