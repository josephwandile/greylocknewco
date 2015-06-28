var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', 'ParseService', function($scope) {
  console.log('Controller Activated');

  // 0, 1, 2, 3 Should always be asked. 

  // if (contact exists) {
  // 	skip: 6 -> 
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