var AccountController = angular.module('AccountController', []);

AccountController.controller('AccountCtrl', ['$scope', 'ParseService', 'AccountFactory',
    function($scope, ParseService, AccountFactory) {
        console.log('Account Controller Activated');

        $scope.account = AccountFactory;
    }
]);
