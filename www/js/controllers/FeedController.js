var FeedController = angular.module('FeedController', []);

FeedController.controller('FeedCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
    console.log('Feed Controller Activated');

    // Checks to see that you're staying up to date with contacts
    ParseService.addEmailReminderActions();

    $scope.dismiss = function(item) {
        $scope.actionItems.splice($scope.actionItems.indexOf(item), 1);
        // *** TODO(neel): mark the given action item as read in Parse
    };

    $scope.actionItems = [];
    var authPromise = ParseService.getAllActionItems();
    authPromise.success(function(data) {
        var actionItems = data.results;

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
    }).error(function(data, status) {
        // debugger
        console.log(status);
    });

    // add additional fields action items

}]);
