/**
 * Created by nali on 2016/6/7.
 */

(function() {
    // var app = angular.module('discounts', []);
    util.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, rename, uploadUrl, uploadCb){
            var fd = new FormData();
            fd.append('file', file);
            fd.append('rename', rename);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success( function(data){
                uploadCb.success(data);
            }).error( function(data){
                uploadCb.error();
            });
        }
    }]);
})();