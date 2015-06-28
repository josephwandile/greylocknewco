var ContactsController = angular.module('ContactsController', []);

ContactsController.controller('ContactsCtrl', ['$scope', 'ParseService', function($scope) {
    console.log('Controller Activated');

    var contacts = [{
        firstName: "Joe",
        lastName: "Kahn",
        title: "Software Engineer",
        company: "Google Inc."
    }, {
        firstName: "Neel",
        lastName: "Mehta",
        title: "Designer",
        company: "Apple Inc."
    }, {
        firstName: "Sherman",
        lastName: "Leung",
        title: "Project Manager",
        company: "Facebook Inc."
    }];

    avatarColors = [
        "positive-bg",
        "calm-bg",
        "balanced-bg",
        "assertive-bg",
        "royal-bg"
    ];

    $scope.contacts = contacts.map(function(contact) {
        // add a random color for their avatar
        var avatarIndex = Math.floor(Math.random() * avatarColors.length);
        contact.avatarColor = avatarColors[avatarIndex];

        // generate their avatar text: their first initialis
        contact.avatarText = contact.firstName.charAt(0) + contact.lastName.charAt(0);

        return contact;
    });
}]);
