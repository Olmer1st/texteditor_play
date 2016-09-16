"use strict";
var main_app = angular.module('main_app', ['mentio', 'ngSanitize']);
main_app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);
main_app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});
main_app.factory('interpolator', function($sce) {
    return function(str) {
        return (str || "").replace(/\{(.*?)\}/g, function(all, match) {
            return $sce.trustAsHtml("<strong>" + match + "</strong>") || all;
        });
    };
});

main_app.directive("contenteditable", function($sce, interpolator) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                // var content = interpolator(html);
                // element.html(content);
                // ngModel.$setViewValue(content);
                ngModel.$setViewValue(html);
            }

            if (!ngModel) return; // do nothing if no ng-model
            // ngModel.$formatters.push(interpolator);
            // Specify how UI should be updated
            ngModel.$render = function() {
                if (ngModel.$viewValue !== element.html()) {
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                }
            };

            // ngModel.$render = function() {
            //     element.html(ngModel.$viewValue);
            //     ngModel.$setViewValue(ngModel.$viewValue);
            // };
            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$apply(read);
            });
            // element.on('keypress', function(e) {
            //   if(e.keyCode==13){ //enter && shift
            //     var html = element.html() + "<br/>";
            //     element.html(html);
            //     //ngModel.$setViewValue(html) ;
            //     //e.preventDefault();
            //   }
            // });
            read(); // initialize
        }
    };
});
