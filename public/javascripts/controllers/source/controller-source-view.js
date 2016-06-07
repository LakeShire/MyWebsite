/**
 * Created by nali on 2016/6/7.
 */

(function() {
    source.controller('ViewSourceCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.source = tempData.getCurrentSource();
        $scope.infos = [];

        if ($scope.source == null) {
            $location.url('source/');
        }

        $scope.edit = function () {
            $location.url('source/edit');
        };

        $scope.getAllInfos = function() {
            $http.get(URL + '/info/infos?source=' + $scope.source.name)
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
    });
})();