/**
 * Created by nali on 2016/6/7.
 */

(function() {
    info.controller('EditUserCtrl', function ($scope, $location, $rootScope, $http, tempData, fileUpload, fileReader) {
        $scope.user = tempData.getCurrentUser();
        $scope.imageSrc = $scope.user.avatar;
        
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

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };

        $scope.upload = function () {
            var file = $scope.picFile;
            var uploadUrl = URL + '/source/upload';
            var rename = $scope.user._id + '.jpg';
            fileUpload.uploadFileToUrl(file, rename, uploadUrl, {
                success : function (data) {
                    $scope.user.avatar = URL + data.fileUrl;
                },
                error : function () {

                }
            });
        };
    });
})();