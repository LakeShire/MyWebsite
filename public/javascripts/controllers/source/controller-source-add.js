/**
 * Created by nali on 2016/6/7.
 */

(function() {
    source.controller('AddSourceCtrl', function ($scope, $location, $rootScope, $http) {
        $scope.source = null;

        $scope.add = function (source) {
            $http.post(URL + '/source/add', source)
                .success(function (data, status, headers, config) {
                    source._id = data;
                    $('#myModal').modal('show');
                });
        };

        $scope.cancel = function () {
            $location.url('/source');
        };

        $scope.closeWindow = function () {
            $('#myModal').modal('hide');
        };
    });
})();