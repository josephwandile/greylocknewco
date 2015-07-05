var TabsController = angular.module('TabsController', []);

TabsController.controller('TabsCtrl', ['$scope', 'AccountFactory',
    function($scope, AccountFactory) {
        console.log('Tabs Controller Activated');

        $scope.account = AccountFactory;

    }
]);
