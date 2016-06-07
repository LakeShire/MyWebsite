/**
 * Created by nali on 2016/6/7.
 */

(function() {
    // var app = angular.module('discounts', []);
    util.filter('trim', function (limitToFilter) {
        return function (input, limit) {
            if (input.length > limit) {
                return limitToFilter(input, limit - 3) + '...';
            }
            return input;
        }
    });
})();