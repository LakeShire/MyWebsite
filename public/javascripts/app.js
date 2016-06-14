/**
 * Created by nali on 2016/6/1.
 */

function removeByValue(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

(function() {
    //  通用URL
    URL = 'http://localhost';

    //  信息模块
    info = angular.module('info', []);

    //  信息源模块
    source = angular.module('source', []);

    //  管理员模块
    admin = angular.module('admin', ['ngCookies']);

    //  通用应用
    util = angular.module('util', []);

    //  登录注册
    logon = angular.module('logon', []);

    var app = angular.module('app', ['admin', 'info', 'source', 'util', 'ngRoute', 'logon']);
    
    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'info/all_admin.html',
            controller : 'AllInfoCtrl'
        }).when('/info', {
            templateUrl : 'info/all_admin.html',
            controller : 'AllInfoCtrl'
        }).when('/info/all', {
            templateUrl : 'info/all.html',
            controller : 'AllInfoCtrl'
        }).when('/info/add', {
            templateUrl : 'info/add.html',
            controller : 'AddInfoCtrl'
        }).when('/info/view', {
            templateUrl : 'info/view_admin.html',
            controller : 'ViewInfoCtrl'
        }).when('/info/edit', {
            templateUrl : 'info/edit.html',
            controller : 'EditInfoCtrl'
        }).when('/source', {
            templateUrl : 'source/all_admin.html',
            controller : 'AllSourceCtrl'
        }).when('/source/all', {
            templateUrl : 'source/all_admin.html',
            controller : 'AllSourceCtrl'
        }).when('/source/add', {
            templateUrl : 'source/add.html',
            controller : 'AddSourceCtrl'
        }).when('/source/view', {
            templateUrl : 'source/view_admin.html',
            controller : 'ViewSourceCtrl'
        }).when('/source/edit', {
            templateUrl : 'source/edit.html',
            controller : 'EditSourceCtrl'
        }).when('/logon', {
            templateUrl : 'logon.html',
            controller : 'LogonCtrl'
        }).when('/user', {
            templateUrl : 'user/all.html',
            controller : 'AllUserCtrl'
        }).when('/user/view', {
            templateUrl : 'user/view_admin.html',
            controller : 'ViewUserCtrl'
        }).when('/user/edit', {
            templateUrl : 'user/edit.html',
            controller : 'EditUserCtrl'
        }).otherwise({
            redirectTo : 'info/all.html'
        });
    });
})();