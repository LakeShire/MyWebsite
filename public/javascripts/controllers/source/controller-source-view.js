/**
 * Created by nali on 2016/6/7.
 */

(function() {
    source.controller('ViewSourceCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.source = tempData.getCurrentSource();
        $scope.infos = [];
        $scope.currentPage = 1;
        $scope.pages = [];

        if ($scope.source == null) {
            $location.url('source/');
        }

        $scope.edit = function () {
            $location.url('source/edit');
        };

        $scope.getInfos = function(page) {
            $http.get(URL + '/info/infos?source=' + $scope.source.name + '&pageId=' + page + '&pageSize=20')
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

        $scope.editInfo = function (info) {
            tempData.setCurrentInfo(info);
            $location.url('/info/edit');
        };

        $scope.viewInfo = function (info) {
            tempData.setCurrentInfo(info);
            $location.url('/info/view');
        };

        $scope.deleteInfo = function (info) {
            $http.post(URL + '/info/delete', info)
                .success(function (data, status, headers, config) {
                    removeByValue($scope.infos, info);
                    $('#myModal').modal('show');
                });
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

        $scope.hasInfos = function () {
          return $scope.infos.length != 0;
        };
    });
})();