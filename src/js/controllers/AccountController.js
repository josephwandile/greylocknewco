var AccountController = angular.module('AccountController', []);

AccountController.controller('AccountCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
    console.log('Account Controller Activated');

    $scope.name = "Neel";
}]);
