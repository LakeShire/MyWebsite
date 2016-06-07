/**
 * Created by nali on 2016/6/7.
 */

(function () {
    admin.controller('AdminCtrl', ['$cookieStore', '$scope', '$location', function ($cookieStore, $scope, $location) {
        $scope.mode = 'info';

        $scope.isMode = function (mode) {
            return $scope.mode == mode;
        };

        $scope.setMode = function (mode) {
            $scope.mode = mode;
        }
    }]);
})();
