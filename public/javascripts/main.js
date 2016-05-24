/**
 * Created by nali on 2016/5/23.
 */

function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

angular.module('main', ['ngCookies']).controller('MainCtrl', function ($cookieStore, $scope, $location, $rootScope, $http) {
    $rootScope.user = $cookieStore.get('user');

    $scope.routes = {
        '/index': 'index.html',
        '/logon_main': 'logon_main.html',
        '/project' : 'project.html',
        '/issue' : 'issue.html',
        '/option/prepare' : 'option/prepare.html',
        '/option/action' : 'option/action.html',
        '/option/after' : 'option/after.html',
        '/' : 'index.html'
    };
    $scope.tplUrl = $scope.routes['/'];
    $scope.defaultTplUrl = $scope.routes['/'];

    $scope.isProject = function () {
        if ($scope.tplUrl == 'project.html') {
            return true;
        } else {
            return false;
        }
    };

    $scope.isIssue = function () {
        if ($scope.tplUrl == 'issue.html') {
            return true;
        } else {
            return false;
        }
    };

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        path = newPath.substring(12, newPath.length);
        if (path != 'logon' && path != 'register') {
            $scope.tplUrl = $scope.routes[newPath] || $scope.defaultTplUrl;
        }
    });

    $scope.logout = function () {
        $cookieStore.put('user', null);
        $rootScope.user = null;
        $location.path('/logon_main');
    };

    $scope.isLoggedOn = function () {
        return $rootScope.user != null;
    };
}).controller('IndexCtrl', function ($scope, $cookieStore, $location, $rootScope, $http) {
    if ($rootScope.user == null) {
        $location.path('/logon_main');
    } else {

    }

    $scope.mode = 'display';
    $scope.editButton = '编辑';

    $scope.notes = [];
    $scope.currentNote = null;
    
    $scope.onItemClicked = function (note) {
        $scope.currentNote = note;
    };
    
    $scope.newItem = function () {
        var date = new Date();
        console.log(date.toLocaleString());
        note = {title : '未命名', msg : '', author : $rootScope.user.name, createAt : date.toLocaleString()};
        $scope.currentNote = note;
        $scope.notes.splice(0, 0, note);
        $scope.mode = 'edit';
        $scope.editButton = '完成';
        $scope.addNotes($rootScope.user, $scope.currentNote);
    };
    
    $scope.isSelected = function (note) {
        return note._id == $scope.currentNote._id;
    };

    $scope.edit = function () {
        if ($scope.mode == 'display') {
            $scope.mode = 'edit';
            $scope.editButton = '完成'
        } else {
            $scope.mode = 'display';
            $scope.editButton = '编辑';
            $scope.addNotes($rootScope.user, $scope.currentNote);
        }
    };

    $scope.delete = function () {
        $scope.deleteNote($scope.currentNote);
        removeByValue($scope.notes, $scope.currentNote);
        $scope.currentNote = $scope.notes[0];
    };

    $scope.isEditMode = function () {
        return $scope.mode == 'edit';
    };

    $scope.getAllNotes = function (user) {
        $http.get("http://localhost/notes/list/" + user.name)
            .success(function (data, status, headers, config) {
                $scope.notes = data;
                $scope.currentNote = $scope.notes[0];
            });
    };

    $scope.addNotes = function (user, note) {
        $http.post("http://localhost/notes/add", note)
            .success(function (data, status, headers, config) {
                console.log(data);
                note._id = data;
            });
    };

    $scope.deleteNote = function (note) {
        $http.post("http://localhost/notes/delete", note)
            .success(function (data, status, headers, config) {
                console.log(data);
            });
    };
    
    $scope.getAllNotes($rootScope.user);
}).controller('LogonCtrl', function ($scope, $location, $http, $cookieStore, $rootScope) {
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
    $scope.logon = function (__user) {
        $http.post("http://localhost/users/logon", __user)
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
                    $cookieStore.put("user", __user);
                    $rootScope.user = __user;
                    $location.path('/index');
                    // getAllNotes($http, $rootScope.user);
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
}).controller('ProjectCtrl', function ($scope, $location, $rootScope) {
    if ($rootScope.user == null) {
        $location.path('/logon_main');
    }
}).controller('IssueCtrl', function ($scope, $location, $rootScope) {
    if ($rootScope.user == null) {
        $location.path('/logon_main');
    }
}).filter('trim', function (limitToFilter) {
    return function (input, limit) {
        if (input.length > limit) {
            return limitToFilter(input, limit - 3) + '...';
        }
        return input;
    }
});
