var FeedController = angular.module('FeedController', []);

FeedController.controller('FeedCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
    console.log('Feed Controller Activated');

    $scope.actionItems = [];
    var authPromise = ParseService.getAllActionItems();

    authPromise.success(function(data) {
        var actionItems = data.results;
        debugger;
        $scope.actionItems = actionItems.map(function(item) {
            if (item.link) {
                // dynamically generate call to action button
                var actionIcon;

                if (item.link.startsWith("mailto:")) {
                    actionIcon = "ion-ios-email";
                } else if (item.link.startsWith("tel:")) {
                    actionIcon = "ion-ios-telephone";
                } else {
                    console.assert(item.link.startsWith("http://") || item.link.startsWith("https://"));
                    actionIcon = "ion-ios-navigate";
                }

                item.actionIcon = actionIcon;
            }

            return item;
        });
    }).error(function(data) {
        debugger
        console.log(data.error);
    });

    // add additional fields action items

}]);