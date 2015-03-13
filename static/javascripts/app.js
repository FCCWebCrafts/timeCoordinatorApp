var app = angular.module('timeApp', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			// Which controller? TODO: write one.
			controller: ''
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			// Which controller? TODO: write one.
			controller: ''
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'DashCtrl',
			resolve: {
				postPromise: ['meetings', function(meetings) {
					return meetings.getAll();
				}]
			}
		})
		.state('singleMeeting', {
			url: '/meeting/{id}',
			templateUrl: 'views/singleMeeting.html',
			controller: 'DashCtrl'
			// need another controller here.
		});	
		$urlRouterProvider.otherwise('home');
	}]);

// provides a list of meetings to other angular stuff that might need it
app.factory('meetings', ['$http', function($http){
	  var o = {
	  	meetings: []
	  };
	  o.getAll = function() {
    	return $http.get('/api/meetings').success(function(data){
      	angular.copy(data, o.meetings);
    });
  };
	return o;

}]);

// Controller for the Dashboard view - User can see meetings, other information, etc.
app.controller('DashCtrl', [
'$scope', 'meetings',
function($scope, meetings){
  $scope.meetings = meetings.meetings;

  $scope.addMeeting = function() {
  	if (!$scope.title || $scope.title === '') {return;}
  	$scope.meetings.push({
  		title: $scope.title,  
  		description: $scope.description, 
  		date : "test value for now.", 
  		admin : "test value for now."});
  	$scope.title = '';
  	$scope.description = '';
  };

}]);
