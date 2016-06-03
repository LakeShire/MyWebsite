/**
 * Created by nali on 2016/6/1.
 */

function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

var URL = 'http://localhost/';

angular.module('discount', ['ngCookies']).controller('AdminCtrl', function ($cookieStore, $scope, $location, $rootScope, $http) {

    $scope.routes = {
        '/' : { url : 'info.html', mode : 'info' },
        '/info': { url : 'info.html', mode : 'info' },
        '/info/all' : { url : 'info.html', mode : 'info' },
        '/info/add' : { url : 'info.html', mode : 'info' },
        '/info/view' : { url : 'info.html', mode : 'info' },
        '/info/edit' : { url : 'info.html', mode : 'info' },
        '/source': { url : 'source.html', mode : 'source' },
        '/source/all' : { url : 'source.html', mode : 'source' },
        '/source/add' : { url : 'source.html', mode : 'source' },
        '/source/view' : { url : 'source.html', mode : 'source' },
        '/source/edit' : { url : 'source.html', mode : 'source' },
    };

    $scope.tplRoute = $scope.routes['/'];
    $scope.defaultRoute = $scope.routes['/'];

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        $scope.tplRoute = $scope.routes[newPath] || $scope.defaultRoute;
    });

    $scope.isMode = function (mode) {
        return $scope.tplRoute.mode == mode;
    };
}).controller('IndexCtrl', function ($cookieStore, $scope, $location, $rootScope, $http) {

    $scope.routes = {
        '/' : { url : 'info/all.html', mode : 'info' },
    };

    $scope.tplRoute = $scope.routes['/'];
    $scope.defaultRoute = $scope.routes['/'];

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        $scope.tplRoute = $scope.routes[newPath] || $scope.defaultRoute;
    });

    $scope.isMode = function (mode) {
        return $scope.tplRoute.mode == mode;
    };
}).controller('InfoCtrl', function ($scope, $location, $http, $cookieStore, $rootScope) {

    $scope.routes = {
        '/info' : { url : 'info/all.html', mode : 'all' },
        '/info/all' : { url : 'info/all.html', mode : 'all' },
        '/info/add' : { url : 'info/add.html', mode : 'add' },
        '/info/view' : { url : 'info/view.html', mode : 'all' },
        '/info/edit' : { url : 'info/edit.html', mode : 'all' }
    };

    $scope.tplRoute = $scope.routes['/info'];
    $scope.defaultRoute = $scope.routes['/info'];

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        $scope.tplRoute = $scope.routes[newPath] || $scope.defaultRoute;
    });

    $scope.isMode = function (mode) {
        return $scope.tplRoute.mode == mode;
    };
}).controller('AddInfoCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.info = null;

    $scope.add = function (info) {
        $http.post(URL + 'info/add', info)
            .success(function (data, status, headers, config) {
                info._id = data;
                $('#myModal').modal('show');
            });
    };

    $scope.cancel = function () {
        $location.url('/');
    };
}).controller('AllInfoCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.infos = new Array();
    
    $scope.getAllInfos = function() {
        $http.get(URL + 'info/all')
            .success(function (data, status, headers, config) {
                for (var i = 0; i < data.length; i++) {
                    info = data[i];
                    if (data[i].description != null) {
                        info.ps = data[i].description.split('\n');
                    }
                    $scope.infos.push(info);
                }
            });
    };
    $scope.getAllInfos();

    $scope.getAllSources = function() {
        $http.get(URL + 'source/all')
            .success(function (data, status, headers, config) {
                $scope.sources = data;
            });
    };
    $scope.getAllSources();

    $scope.setCurrentInfo = function (info) {
      $rootScope.currentInfo = info;

    };

    $scope.delete = function (info) {
        $http.post(URL + 'info/delete', info)
            .success(function (data, status, headers, config) {
                removeByValue($scope.infos, info);
                $('#myModal').modal('show');
            });
    };

    $scope.view = function (info) {
        $scope.setCurrentInfo(info);
        $location.url('/info/view');
    };

    $scope.edit = function (info) {
        $scope.setCurrentInfo(info);
        $location.url('/info/edit');
    }
}).controller('ViewInfoCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.info = $rootScope.currentInfo;

    if ($scope.info == null) {
        $location.url('info/');
    }

    $scope.edit = function () {
        $location.url('info/edit');
    };

    if ($scope.info != null && $scope.info.tags != null) {
        $scope.tags = $scope.info.tags.split(",");
    }
}).controller('EditInfoCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.info = $rootScope.currentInfo;

    if ($scope.info.source != null && $scope.info.source.name != null) {
        $scope.info.source = $scope.info.source.name;
    }

    $scope.edit = function (info) {
        $http.post(URL + 'info/add', info)
            .success(function (data, status, headers, config) {
                info._id = data;
                $('#myModal').modal('show');
            });
    };

    $scope.cancel = function () {
        $location.url('/');
    };
}).controller('SourceCtrl', function ($scope, $location, $http, $cookieStore, $rootScope) {

    $scope.routes = {
        '/source' : { url : 'source/all.html', mode : 'all' },
        '/source/all' : { url : 'source/all.html', mode : 'all' },
        '/source/add' : { url : 'source/add.html', mode : 'add' },
        '/source/edit' : { url : 'source/edit.html', mode : 'all' },
        '/source/view' : { url : 'source/view.html', mode : 'add' }
    };

    $scope.tplRoute = $scope.routes['/source'];
    $scope.defaultRoute = $scope.routes['/source'];

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        $scope.tplRoute = $scope.routes[newPath] || $scope.defaultRoute;
    });

    $scope.isMode = function (mode) {
        return $scope.tplRoute.mode == mode;
    };
}).controller('AddSourceCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.source = null;

    $scope.add = function (source) {
        $http.post(URL + 'source/add', source)
            .success(function (data, status, headers, config) {
                source._id = data;
                $('#myModal').modal('show');
            });
    };

    $scope.cancel = function () {
        $location.url('/source');
    };
}).controller('AllSourceCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.sources = null;

    $scope.getAllSources = function() {
        $http.get(URL + 'source/all')
            .success(function (data, status, headers, config) {
                $scope.sources = data;
            });
    };
    $scope.getAllSources();

    $scope.setCurrentSource = function (source) {
        $rootScope.currentSource = source;
    };

    $scope.delete = function (source) {
        $http.post(URL + 'source/delete', source)
            .success(function (data, status, headers, config) {
                removeByValue($scope.sources, source);
                $('#myModal').modal('show');
            });
    };

    $scope.view = function (source) {
        $scope.setCurrentSource(source);
        $location.url('/source/view');
    };

    $scope.edit = function (source) {
        $scope.setCurrentSource(source);
        $location.url('/source/edit');
    }
}).controller('EditSourceCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.source = $rootScope.currentSource;

    $scope.edit = function (info) {
        $http.post(URL + 'source/add', source)
            .success(function (data, status, headers, config) {
                source._id = data;
                $('#myModal').modal('show');
            });
    };

    $scope.cancel = function () {
        $location.url('/source');
    };
}).controller('ViewSourceCtrl', function ($scope, $location, $rootScope, $http) {
    $scope.source = $rootScope.currentSource;
    $scope.infos = new Array();

    if ($scope.source == null) {
        $location.url('source/');
    }

    $scope.edit = function () {
        $location.url('source/edit');
    };

    $scope.getAllInfos = function() {
        $http.get(URL + 'info/infos?source=' + $scope.source.name)
            .success(function (data, status, headers, config) {
                for (var i = 0; i < data.length; i++) {
                    var info = data[i];
                    if (data[i].description != null) {
                        info.ps = data[i].description.split('\n');
                    }
                    $scope.infos.push(info);
                }
            });
    };
    $scope.getAllInfos();

    $scope.setCurrentInfo = function (info) {
        $rootScope.currentInfo = info;
    };

    $scope.editInfo = function (info) {
        $scope.setCurrentInfo(info);
        $location.url('/info/edit');
    };

    $scope.viewInfo = function (info) {
        $scope.setCurrentInfo(info);
        $location.url('/info/view');
    };

    $scope.deleteInfo = function (info) {
        $http.post(URL + 'info/delete', info)
            .success(function (data, status, headers, config) {
                removeByValue($scope.infos, info);
                $('#myModal').modal('show');
            });
    };
}).controller('ProjectCtrl', function ($scope, $location, $rootScope) {
    if ($rootScope.user == null) {
        $location.path('/logon_main');
    }
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
        $http.post(URL + 'users/add', register_user)
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
        $http.post(URL + 'users/logon', __user)
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
                    $location.path('/main');
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
}).controller('ProfileCtrl', function ($scope, $location, $rootScope) {
    if ($rootScope.user == null) {
        $location.path('/logon_main');
    }

    $scope.routes = {
        '/profile' : 'profile/info.html',
        '/profile/settings': 'profile/settings.html',
        '/profile/info': 'profile/info.html'
    };

    $scope.tplUrl = $scope.routes['/profile'];
    $scope.defaultTplUrl = $scope.routes['/profile'];

    $scope.$watch(function () {
        return $location.path();
    }, function (newPath) {
        $scope.tplUrl = $scope.routes[newPath] || $scope.defaultTplUrl;
    });

}).filter('trim', function (limitToFilter) {
    return function (input, limit) {
        if (input.length > limit) {
            return limitToFilter(input, limit - 3) + '...';
        }
        return input;
    }
});
