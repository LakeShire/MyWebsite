/**
 * Created by nali on 2016/6/7.
 */

(function() {
    source.controller('EditSourceCtrl', function ($scope, $location, $rootScope, $http, fileReader, fileUpload, tempData) {
        $scope.source = tempData.getCurrentSource();

        $scope.edit = function (source) {
            $http.post(URL + '/source/add', source)
                .success(function (data, status, headers, config) {
                    source._id = data;
                    $('#myModal').modal('show');
                });
        };

        $scope.cancel = function () {
            $location.url('/source');
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
            var rename = $scope.source._id + '.jpg';
            fileUpload.uploadFileToUrl(file, rename, uploadUrl, {
                success : function (data) {
                    console.log(data);
                    $scope.source.pic = URL + data.fileUrl;
                },
                error : function () {

                }
            });
        };

        $scope.isAdmin = function () {
            return $rootScope.user.role === 'admin';
        };
    });
})();