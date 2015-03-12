var app = angular.module('timeApp', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'DashCtrl'
		})
		.state('singleMeeting', {
			url: '/meeting',
			templateUrl: 'views/singleMeeting.html',
			controller: 'DashCtrl'
		});	
		$urlRouterProvider.otherwise('home');
	}]);

// provides a list of meetings to other angular stuff that might need it
app.factory('meetings', [function(){
	var o = {
		meetings: []
		// can i get data from the database here??
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
  	$scope.meetings.push({title: $scope.title,  description: $scope.description, date : "test value for now.", admin : "test value for now."});
  	$scope.title = '';
  	$scope.description = '';
  };

}]);