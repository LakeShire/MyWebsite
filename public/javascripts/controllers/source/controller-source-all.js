/**
 * Created by nali on 2016/6/7.
 */

(function() {
    source.controller('AllSourceCtrl', function ($scope, $location, $rootScope, $http, tempData) {
        $scope.sources = null;

        $scope.getAllSources = function() {
            $http.get(URL + '/source/all')
                .success(function (data, status, headers, config) {
                    $scope.sources = data;
                });
        };
        $scope.getAllSources();

        $scope.setCurrentSource = function (source) {
            $rootScope.currentSource = source;
        };

        $scope.delete = function (source) {
            $http.post(URL + '/source/delete', source)
                .success(function (data, status, headers, config) {
                    removeByValue($scope.sources, source);
                    $('#myModal').modal('show');
                });
        };

        $scope.view = function (source) {
            tempData.setCurrentSource(source);
            $location.url('/source/view');
        };

        $scope.edit = function (source) {
            tempData.setCurrentSource(source);
            $location.url('/source/edit');
        };

        $scope.add = function () {
            $location.url('/source/add');
        };

        $scope.isAdmin = function () {
            return $rootScope.user.role === 'admin';
        };
    });
})();