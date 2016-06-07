/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('AddInfoCtrl', function ($scope, $location, $rootScope, $http) {
        $scope.info = null;

        $scope.add = function (info) {
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