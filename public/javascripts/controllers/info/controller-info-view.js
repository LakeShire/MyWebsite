/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('ViewInfoCtrl', function ($scope, $location, $rootScope, tempData) {
        $scope.info = tempData.getCurrentInfo();
        
        if ($scope.info == null) {
            $location.url('info/');
        }

        $scope.edit = function () {
            $location.url('info/edit');
        };

        if ($scope.info != null && $scope.info.tags != null) {
            $scope.tags = $scope.info.tags.split(",");
        }

        $scope.isAdmin = function () {
            return $rootScope.user.role === 'admin';
        };
    })
})();