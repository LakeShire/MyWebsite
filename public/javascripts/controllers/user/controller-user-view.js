/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('ViewUserCtrl', function ($scope, $location, $rootScope, $cookieStore, $http, tempData) {
        $scope.user = tempData.getCurrentUser();
        $scope.infos = $scope.user.collections;
        
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

        $scope.viewInfo = function (info) {
            tempData.setCurrentInfo(info);
            $location.url('/info/view');
        };

        $scope.deleteCollect = function (info) {
            $http.post(URL + '/collection/delete', {'user' : $scope.user, 'info' : info})
                .success(function (data, status, headers, config) {
                    var ret = data['ret'];
                    if (ret === 0) {
                        var user = data['user'];
                        $rootScope.user = user;
                        $scope.user = user;
                        $scope.infos = $scope.user.collections;
                        $cookieStore.put('user', user);
                        $('#myModal').modal('show');
                    }
                });
        };

        $scope.hasCollection = function () {
            return $scope.infos != null && $scope.infos.length != 0;
        };
    })
})();