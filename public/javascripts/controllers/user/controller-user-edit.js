/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('EditUserCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.user = tempData.getCurrentUser();

        $scope.edit = function (user) {
            $http.post(URL + '/user/update', user)
                .success(function (data, status, headers, config) {
                    user._id = data;
                    $('#myModal').modal('show');
                });
        };

        $scope.cancel = function () {
            $location.url('user/');
        };
    });
})();