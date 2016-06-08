/**
 * Created by nali on 2016/6/7.
 */

(function () {
    admin.controller('AdminCtrl', ['$cookieStore', '$scope', '$location', '$rootScope', function ($cookieStore, $scope, $location, $rootScope) {
        $rootScope.mode = 'info';

        $rootScope.user = $cookieStore.get('user');

        $scope.isMode = function (mode) {
            return $rootScope.mode == mode;
        };

        $scope.setMode = function (mode) {
            $rootScope.mode = mode;
        };

        $scope.isLoggedOn = function () {
            return $rootScope.user != null;
        };

        $scope.isAdmin = function () {
            return $rootScope.user.role === 'admin';
        };

        $scope.isLogging = function () {
            return $rootScope.mode == 'logon';
        };

        $scope.logon = function () {
            $scope.setMode('logon');
            $location.url('logon');
        };

        $scope.logout = function () {
            $cookieStore.put("user", null);
            $rootScope.user = null;
        };

        $scope.shouldShow = function () {
            if ($scope.isLoggedOn()) {
                if ($rootScope.mode === 'user') {
                    if ($scope.isAdmin()) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else if ($scope.isLogging()) {
                return true;
            } else {
                return false;
            }
        };
    }]);
})();
