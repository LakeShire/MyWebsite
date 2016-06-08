/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('AllUserCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.users = [];

        $scope.getAllUsers = function() {
            $http.get(URL + '/user/all')
                .success(function (data, status, headers, config) {
                    $scope.users = data;
                });
        };
        $scope.getAllUsers();

        $scope.delete = function (user) {
            $http.post(URL + '/user/delete', user)
                .success(function (data, status, headers, config) {
                    removeByValue($scope.users, user);
                    $('#myModal').modal('show');
                });
        };

        $scope.view = function (user) {
            tempData.setCurrentUser(user);
            $location.url('/user/view');
        };

        $scope.edit = function (user) {
            tempData.setCurrentUser(user);
            $location.url('/user/edit');
        };

        $scope.add = function () {
            $location.url('/user/add');
        };

        $scope.role = function (role) {
            if (role === 'admin') {
                return '管理员';
            } else if (role === 'vip') {
                return 'VIP';
            } else {
                return '普通';
            }
        };
    });
})();