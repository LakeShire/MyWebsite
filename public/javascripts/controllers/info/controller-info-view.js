/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('ViewInfoCtrl', function ($scope, $location, $rootScope, $http, $cookieStore, tempData) {
        $scope.info = tempData.getCurrentInfo();
        
        if ($scope.info == null) {
            $location.url('info/');
        }

        $scope.edit = function () {
            $location.url('info/edit');
        };

        if ($scope.info != null && $scope.info.tags != null) {
            $scope.tags = $scope.info.tags.split(",");
        }

        $scope.isAdmin = function () {
            return $rootScope.user != null && $rootScope.user.role === 'admin';
        };

        $scope.collect = function () {
            if ($scope.isCollected()) {
                $scope.deleteCollect();
            } else {
                $http.post(URL + '/collection/add', {'user': $rootScope.user, 'info': $scope.info})
                    .success(function (data, status, headers, config) {
                        var ret = data['ret'];
                        if (ret == 0) {
                            $scope.collected = true;
                            var user = data['user'];
                            $cookieStore.put('user', user);
                            $rootScope.user = user;
                            $('#myModal').modal('show');
                        }
                    });
            }
        };

        $scope.deleteCollect = function () {
            $http.post(URL + '/collection/delete', {'user' : $rootScope.user, 'info' : $scope.info})
                .success(function (data, status, headers, config) {
                    var ret = data['ret'];
                    if (ret === 0) {
                        var user = data['user'];
                        $rootScope.user = user;
                        $scope.infos = $scope.user.collections;
                        $cookieStore.put('user', user);
                        $scope.collected = false;
                        console.log('set collected to false');
                        $('#myModal').modal('show');
                    }
                });
        };

        $scope.isCollected = function () {
            return $scope.collected;
        };

        $scope.initCollected = function () {
            $scope.collected = false;
            var collections = $rootScope.user.collections;
            if (collections == null) {
                $scope.collected = false;
            } else {
                for (var i = 0; i < collections.length; i++) {
                    if ($scope.info._id === collections[i]._id) {
                        $scope.collected = true;
                        break;
                    }
                }
            }
        };
        $scope.initCollected();
    })
})();