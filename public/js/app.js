angular.module('TimeCoordinator', [
  'ui.router', 
  'ui.bootstrap',
  'ngResource',
  'ngCookies',
  'TimeCoordinator.Users',
  'TimeCoordinator.Meetings',
  'TimeCoordinator.Availability',
  'TimeCoordinator.Auth',
  'TimeCoordinator.directives'
])
.run(['$state', function($state) {
  $state.go('profile');
}])

.config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
  
  $httpProvider
  .interceptors.push(function($q, $location){
    return {
      response: function(response) {
        return response;
      },
      responseError: function(response) {
        if (response.status === 401)
          $location.url('/login');
        return $q.reject(response);
      }
    };
  });
  var checkLoggedIn = function($q, $timeout, $http, $state) {
  var deferred = $q.defer();
  $http.get('/loggedin').success(function(user){
    if (user !== '0'){
      deferred.resolve();
    }else{
      deferred.reject();
      $state.go('login');
    }
  });
  return deferred.promise;
};
  $stateProvider
  .state('login', {
  url: '/login',
  templateUrl: 'partials/login.jade',
  controller: 'LoginController'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'partials/signup.jade',
    controller: 'SignupController'
  })
    
  .state('profile',{
    url: '/profile',
    templateUrl: 'partials/profile.jade',
    controller: 'UserController',
    resolve: {
      loggedin: checkLoggedIn
    }
})
  
  .state('upcomingmeetings', {
    url: '/meetings',
    templateUrl: 'partials/viewmeetings.jade',
    controller: 'MeetingController',
    params: {
      updated: false
    },
    resolve: {
      loggedin: checkLoggedIn
    }
  })
  
  .state('singlemeeting', {
    url: '/meetings/:id',
    templateUrl: 'partials/singlemeeting.jade',
    controller: 'SingleMeetingController',
    resolve: {
      loggedin: checkLoggedIn
    },
    params: {
      updated: false
    }
})
  
  .state('createmeetings', {
    url: '/meeting/create',
    templateUrl: '/partials/createmeeting.jade',
    controller: 'CreateMeetingController',
    resolve: {
      loggedin: checkLoggedIn
    }
  });
  $locationProvider.html5Mode(true);
}]);