var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', /*'$route', */ /*'$window', */ '$location', 'ParseService', function($scope, $location, ParseService /*, $route*/ /*, $window*/ ) {
    console.log('Controller Activated');

    var contacts = [];

    var authPromise = ParseService.getAllContacts();

    authPromise.success(function(data) {

        var contacts = data.results;

        console.log("Test", contacts)

        $scope.first_name = 'Joe';
        $scope.last_name = 'Kahn';
        $scope.location = 'FB Recruiting Event';
        $scope.met_at = '2015-06-27T23:31:30.446Z';
        $scope.type = 'Recruiting';

        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].first_name !== $scope.first_name || contacts[i].last_name !== $scope.last_name) {
  				if (i + 1 === contacts.length) {
  					console.log('Contact does not exist.');

  					// Create new user
  					// $location.path('/add/profile');

  				}
            } else {
            	console.log('Contact exists with ID: ', contacts[i].objectId);

            	ParseService.current_contact_id = contacts[i].objectId;
            	$location.path('tab/add/meeting');
            }
        }

    }).error(function(data, status) {
        console.log('Something went wrong.');
    });

    // $location.path('/feed');

    /*  // $route.reload();
      $window.reload();*/

    // check name against backend... 


    /*Render the first form. Add logic to route to necessary second form, either to 
    profile, or to meeting...*/

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