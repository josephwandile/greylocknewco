var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope',/*'$route', */ /*'$window', */'$location', 'ParseService', function($scope, $location/*, $route*//*, $window*/) {
  console.log('Controller Activated');

  $location.path('/feed');

/*  // $route.reload();
  $window.reload();*/

// check name against backend... 


/*Render the first form. Add logic to route to necessary second form, either to 
profile, or to meeting...*/

	
  // 0, 1, 2, 3 Should always be asked. 

  // 
  // 0, 1, 2, 3

  // if (contact exists) {
  // 	skip: 7 -> 
  // } else {
  // 		do: 4, 5
  // }

  // // Profile Creation

  // check: existing Profile

  // 	yes: update contact 

  // 		send: meeting data

  // 			type, met_at, 

  // 	no: new contact

  // 		create contact

  // 			send: contact data

  // 		get objectID

  // 		send: meeting data

  // 		update contact 

}]);