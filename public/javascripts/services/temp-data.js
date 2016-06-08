/**
 * Created by nali on 2016/6/7.
 */

(function() {
    util.service('tempData', [function () {

        this.currentInfo = null;
        this.currentSource = null;
        this.currentUser = null;
        
        this.setCurrentInfo = function (info) {
            this.currentInfo = info;
        };

        this.getCurrentInfo = function () {
            return this.currentInfo;
        };

        this.setCurrentSource = function (source) {
            this.currentSource = source;
        };

        this.getCurrentSource = function () {
            return this.currentSource;
        };

        this.setCurrentUser = function (user) {
            this.currentUser = user;
        };

        this.getCurrentUser = function () {
            return this.currentUser;
        }
    }]);
})();