/**
 * Created by nali on 2016/6/7.
 */

(function() {
    util.service('tempData', ['$cookieStore', function ($cookieStore) {

        this.currentInfo = null;
        this.currentSource = null;
        this.currentUser = null;
        
        this.setCurrentInfo = function (info) {
            this.currentInfo = info;
            //  info太大了 怎么办
            // $cookieStore.put('current_info', info);
        };

        this.getCurrentInfo = function () {
            // if (this.currentInfo != null) {
                return this.currentInfo;
            // } else {
                // return $cookieStore.get('current_info');
            // }
        };

        this.setCurrentSource = function (source) {
            this.currentSource = source;
            $cookieStore.put('current_source', source);
        };

        this.getCurrentSource = function () {
            if (this.currentSource != null) {
                return this.currentSource;
            } else {
                return $cookieStore.get('current_source');
            }
        };

        this.setCurrentUser = function (user) {
            this.currentUser = user;
            $cookieStore.put('current_user', user);
        };

        this.getCurrentUser = function () {
            if (this.currentUser != null) {
                return this.currentUser;
            } else {
                return $cookieStore.get('current_user');
            }
        }
    }]);
})();