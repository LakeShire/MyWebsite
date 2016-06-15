/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('AllInfoCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.infos = [];
        $scope.currentPage = 1;
        $scope.pages = [];

        if ($rootScope.user == null && $rootScope.admin) {
            $location.url('logon');
        }
        
        $scope.getInfos = function(page) {
            $http.get(URL + '/info/infos?pageId=' + page + '&pageSize=5')
                .success(function (data, status, headers, config) {
                    var ret = data['ret'];
                    if (ret == 0) {
                        $scope.totalPage = data['totalPage'];
                        $scope.pages = [];
                        for (i = 0; i < $scope.totalPage; i++) {
                            $scope.pages.push(i + 1);
                        }
                        $scope.infos = [];
                        var infos = data['infos'];
                        for (var i = 0; i < infos.length; i++) {
                            info = infos[i];
                            if (infos[i].description != null) {
                                info.ps = infos[i].description.split('\n');
                            }
                            $scope.infos.push(info);
                        }
                    }
                });
        };
        $scope.getInfos(0);

        $scope.getAllSources = function() {
            $http.get(URL + '/source/all')
                .success(function (data, status, headers, config) {
                    $scope.sources = data;
                });
        };
        $scope.getAllSources();

        $scope.delete = function (info) {
            $http.post(URL + '/info/delete', info)
                .success(function (data, status, headers, config) {
                    removeByValue($scope.infos, info);
                    $('#myModal').modal('show');
                });
        };

        $scope.view = function (info) {
            tempData.setCurrentInfo(info);
            $location.url('/info/view');
        };

        $scope.edit = function (info) {
            tempData.setCurrentInfo(info);
            $location.url('/info/edit');
        };

        $scope.add = function () {
            $location.url('/info/add');
        };

        $scope.isAdmin = function () {
            return $rootScope.user != null && $rootScope.user.role === 'admin';
        };

        $scope.next = function () {
            if ($scope.currentPage < $scope.totalPage) {
                $scope.currentPage++;
                $scope.loadPage($scope.currentPage);
            }
        };

        $scope.prev = function () {
            if ($scope.currentPage > 1) {
                $scope.currentPage--;
                $scope.loadPage($scope.currentPage);
            }
        };

        $scope.first = function () {
            $scope.currentPage = 1;
            $scope.loadPage($scope.currentPage);
        };

        $scope.last = function () {
            $scope.currentPage = $scope.totalPage;
            $scope.loadPage($scope.currentPage);
        };

        $scope.loadPage = function (page) {
            $scope.currentPage = page;
            $scope.getInfos(page - 1);
        };

        $scope.isSelect = function (page) {
            return $scope.currentPage === page;
        };

        $scope.nextPage = function () {
            if ($scope.busy) {
                return;
            }
            $scope.busy = true;
            
            $http.get(URL + '/info/infos?pageId=' + $scope.currentPage + '&pageSize=5')
                .success(function (data, status, headers, config) {
                    var ret = data['ret'];
                    if (ret == 0) {
                        var infos = data['infos'];
                        for (var i = 0; i < infos.length; i++) {
                            info = infos[i];
                            if (infos[i].description != null) {
                                info.ps = infos[i].description.split('\n');
                            }
                            $scope.infos.push(info);
                        }
                    }
                    $scope.busy = false;
                    $scope.currentPage++;
                });
        };
        
        $scope.canLoadMore = function () {
            return !$scope.busy && ($scope.currentPage < $scope.totalPage);
        }
    });
})();