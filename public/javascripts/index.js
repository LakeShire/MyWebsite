/**
 * Created by nali on 2016/5/20.
 */

angular.module('index', []).controller('LogonCtrl', function ($scope, $location, $http) {

    $scope.routes = {
        '/logon': {tplUrl: 'logon.html', mode : '登录'},
        '/register': {tplUrl: 'register.html', mode : '注册'}
    };

    $scope.defaultTplUrl = $scope.routes['/logon'];
    $scope.selectedRoute;

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        $scope.selectedRoute = $scope.routes[newPath] || $scope.defaultTplUrl;
    });

    $scope.isLogonMode = function () {
       if ($scope.selectedRoute.mode == '登录') {
           return true;
       } else {
           return false;
       }
    };

    $scope.showError = function (ngModelController, error) {
        return ngModelController.$error[error];
    };

    $scope.register = function (register_user) {
        $http.post("http://localhost/users/add", register_user)
            .success(function (data, status, headers, config) {
                if (data == 'Error') {
                    $scope.registerUserExist = true;
                }
        });
    };
    
    $scope.userNotExist = false;
    $scope.logon = function (user) {
        $http.post("http://localhost/users/logon", user)
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
                }
            });
    };

    $scope.userExist = false;
});