/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('ViewUserCtrl', function ($scope, $location, $rootScope, tempData) {
        $scope.user = tempData.getCurrentUser();
        
        if ($scope.user == null) {
            $location.url('user/');
        }

        $scope.edit = function () {
            $location.url('user/edit');
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
    })
})();