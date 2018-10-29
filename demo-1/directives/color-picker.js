(function(angular) {
  'use strict';
  var module = angular.module('bookStoreApp');

  module.directive('ddjfColorPicker', [
    function() {
      return {
        scope: {
          format: '@' // @ =
        },
        restrict: 'A',
        require: '?ngModel',
        templateUrl: './directives/color-picker.html',
        link: function(scope, element, attr, ctrl) {
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
              onSave(hsva, instance) {
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
          };

          // setTimeout();
          initUI();

          scope.$on('$destroy', function $destroy() {
            picker.destroyAndRemove();
          });
        }
      };
    }
  ]);
})(angular);
