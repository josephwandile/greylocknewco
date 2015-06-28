var FeedController = angular.module('FeedController', []);

FeedController.controller('FeedCtrl', ['$scope', 'ParseService', function($scope) {
    console.log('Controller Activated');

    actionItems = [{
        contact: {
            firstName: "Joe",
            lastName: "Kahn",
            title: "Software Engineer",
            company: "Google Inc."
        },
        text: "Joe's coming to San Francisco on 6/30. Email him!",
        link: "mailto:josephkahn@college.harvard.edu",
        date: "July 4, 2015"
    }, {
        contact: {
            firstName: "Neel",
            lastName: "Mehta",
            title: "Software Engineer",
            company: "Google Inc."
        },
        text: "Give Neel a call -- it's their birthday!",
        link: "tel:2159906434",
        date: "July 4, 2015"
    }, {
        contact: {
            firstName: "Sherman",
            lastName: "Leung",
            title: "Software Engineer",
            company: "Google Inc."
        },
        text: "Read this article Sherman mentioned.",
        link: "http://google.com",
        date: "July 4, 2015"
    }];

    // add additional fields action items
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
}]);
