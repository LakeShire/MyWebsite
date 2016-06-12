/**
 * Created by nali on 2016/6/7.
 */

(function() {

    logon.controller('LogonCtrl', function ($scope, $location, $http, $cookieStore, $rootScope) {
        $scope.mode = 'logon';

        $scope.isMode = function (mode) {
            return $scope.mode == mode;
        };

        $scope.setMode = function (mode) {
            $scope.mode = mode;
        };

        $scope.showError = function (ngModelController, error) {
            return ngModelController.$error[error];
        };

        $scope.register = function (register_user) {
            $scope.registerUserExist = false;
            $scope.shouldShowRName = false;
            $scope.shouldShowREmail = false;
            $scope.shouldShowRPassword = false;
            $http.post(URL + '/user/add', register_user)
                .success(function (data, status, headers, config) {
                    if (data == 'Error') {
                        $scope.registerUserExist = true;
                    } else {
                        $('#myModal').modal('show');
                    }
                });
        };

        $scope.userNotExist = false;
        $scope.logon = function (__user) {
            $http.post(URL + '/user/logon', __user)
                .success(function (data, status, headers, config) {
                    if (data == 'User not exist') {
                        $scope.userNotExist = true;
                        $scope.logonErrorMsg = '用户不存在';
                    } else if (data == 'Password Error') {
                        $scope.passwordError = true;
                        $scope.logonErrorMsg = '密码错误';
                    } else {
                        $scope.userNotExist = false;
                        $scope.passwordError = false;
                        $cookieStore.put("user", data);
                        $rootScope.user = data;
                        
                        //  fix: 跳转页面后 标签未高亮到默认
                        $rootScope.mode = 'info';
                        $location.url('/');
                    }
                });
        };

        $scope.userExist = false;

        $scope.shouldShowName = false;
        $scope.shouldShowPassword = false;
        $scope.onBlurName = function () {
            $scope.shouldShowName = true;
        };
        $scope.onBlurPassword = function () {
            $scope.shouldShowPassword = true;
        };
    });
})();