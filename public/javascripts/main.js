/**
 * Created by nali on 2016/5/23.
 */

angular.module('main', ['ngCookies']).controller('MainCtrl', function ($cookieStore, $scope, $location) {
    $scope.loggedOn = false;

    $scope.routes = {
        '/index': 'index.html',
        '/logon_main': 'logon_main.html'
    };
    $scope.tplUrl = $scope.routes['/logon_main'];
    $scope.defaultTplUrl = $scope.routes['/logon_main'];

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        $scope.tplUrl = $scope.routes[newPath] || $scope.defaultTplUrl;
    });

    var user = $cookieStore.get('user');
    if (user != null) {
        $location.path('/index');
    }
}).controller('IndexCtrl', function ($scope, $cookieStore) {
    var user = $cookieStore.get('user');
    $scope.item = '用户: ' + user.name;
}).controller('LogonCtrl', function ($scope, $location, $http, $cookieStore) {
    $scope.loggedOn = false;

    $scope.routes = {
        '/logon_main' : {tplUrl: 'logon.html', mode : '登录'},
        '/logon_main/logon': {tplUrl: 'logon.html', mode : '登录'},
        '/logon_main/register': {tplUrl: 'register.html', mode : '注册'}
    };

    $scope.defaultTplUrl = $scope.routes['/logon_main'];
    $scope.selectedRoute = $scope.routes['/logon_main'];

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        console.log('newPath: ' + newPath);
        console.log('select: ' + ($scope.routes[newPath] || $scope.defaultTplUrl).tplUrl);
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
        $scope.registerUserExist = false;
        $scope.shouldShowRName = false;
        $scope.shouldShowREmail = false;
        $scope.shouldShowRPassword = false;
        $http.post("http://localhost/users/add", register_user)
            .success(function (data, status, headers, config) {
                if (data == 'Error') {
                    $scope.registerUserExist = true;
                } else {
                    $('#myModal').modal('show');
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
                    $cookieStore.put("user", user);
                    $location.path('/index');
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

    $scope.shouldShowRName = false;
    $scope.shouldShowREmail = false;
    $scope.shouldShowRPassword = false;
    $scope.onBlurRName = function () {
        $scope.shouldShowRName = true;
    };
    $scope.onBlurREmail = function () {
        $scope.shouldShowREmail = true;
    };
    $scope.onBlurRPassword = function () {
        $scope.shouldShowRPassword = true;
    };

    $scope.closeWindow = function () {
        $('#myModal').modal('hide');
    };
});
