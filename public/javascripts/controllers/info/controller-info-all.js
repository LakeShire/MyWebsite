/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('AllInfoCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.infos = [];

        $scope.getAllInfos = function() {
            $http.get(URL + '/info/all')
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
        }
    });
})();