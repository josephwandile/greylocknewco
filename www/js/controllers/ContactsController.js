var ContactsController = angular.module('ContactsController', []);

ContactsController.controller('ContactsCtrl', [$scope, 'ParseService', function($scope) {
  console.log('Controller Activated');
}]);