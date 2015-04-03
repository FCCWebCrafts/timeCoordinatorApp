/*global angular*/
angular.module('TimeCoordinator.Users')
  .factory('ActiveUser', ['$resource', function($resource) {
    return $resource('/api/users/:user_id');
  }])

  .service('popupService', ['$window', function($window){
    this.showPopup = function(message) {
      return $window.confirm(message);
    };
  }]);