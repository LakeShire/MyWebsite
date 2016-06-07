/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('EditInfoCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.info = tempData.getCurrentInfo();

        if ($scope.info.source != null && $scope.info.source.name != null) {
            $scope.info.source = $scope.info.source.name;
        }

        $scope.edit = function (info) {
            $http.post(URL + '/info/add', info)
                .success(function (data, status, headers, config) {
                    info._id = data;
                    $('#myModal').modal('show');
                });
        };

        $scope.cancel = function () {
            $location.url('/');
        };
    });
})();