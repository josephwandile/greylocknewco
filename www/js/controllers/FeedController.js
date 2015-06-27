var FeedController = angular.module('FeedController', []);

FeedController.controller('FeedCtrl', [$scope, 'ParseService', function($scope) {
  console.log('Controller Activated');
}]);