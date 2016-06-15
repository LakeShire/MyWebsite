/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('IndexCtrl', function ($scope, $location, $rootScope, $http, $cookieStore, tempData) {
        // $scope.infos = [];
        //
        // $scope.getAllInfos = function() {
        //     $http.get(URL + '/info/all')
        //         .success(function (data, status, headers, config) {
        //             for (var i = 0; i < data.length; i++) {
        //                 info = data[i];
        //                 if (data[i].description != null) {
        //                     info.ps = data[i].description.split('\n');
        //                 }
        //                 $scope.infos.push(info);
        //             }
        //         });
        // };
        // $scope.getAllInfos();
        //
        // $scope.getAllSources = function() {
        //     $http.get(URL + '/source/all')
        //         .success(function (data, status, headers, config) {
        //             $scope.sources = data;
        //         });
        // };
        // $scope.getAllSources();
        //
        // $scope.delete = function (info) {
        //     $http.post(URL + '/info/delete', info)
        //         .success(function (data, status, headers, config) {
        //             removeByValue($scope.infos, info);
        //             $('#myModal').modal('show');
        //         });
        // };
        //
        // $scope.view = function (info) {
        //     tempData.setCurrentInfo(info);
        //     $location.url('/info/view');
        // };
        //
        // $scope.edit = function (info) {
        //     tempData.setCurrentInfo(info);
        //     $location.url('/info/edit');
        // };
        //
        // $scope.add = function () {
        //     $location.url('/info/add');
        // };
        //
        // $scope.isAdmin = function () {
        //     return $rootScope.user != null && $rootScope.user.role === 'admin';
        // };

        $rootScope.mode = 'info';
        $rootScope.admin = false;

        $rootScope.user = $cookieStore.get('user');

        $scope.isMode = function (mode) {
            return $rootScope.mode == mode;
        };

        $scope.setMode = function (mode) {
            $rootScope.mode = mode;
            if (mode === 'user') {
                if ($rootScope.user === null) {
                    $location.url('/logon');
                } else {
                    tempData.setCurrentUser($rootScope.user);
                    $location.url('/user/view');
                }
            }
        };

        $scope.isLoggedOn = function () {
            return $rootScope.user != null;
        };

        $scope.logout = function () {
            $cookieStore.put("user", null);
            $rootScope.user = null;
        };

        $scope.logon = function () {
            $scope.setMode('logon');
            $location.url('logon');
        };
    });
})();