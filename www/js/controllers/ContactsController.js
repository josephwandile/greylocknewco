var ContactsController = angular.module('ContactsController', []);

ContactsController.controller('ContactsCtrl', ['$scope', 'ParseService', '$location', function($scope, ParseService, $location) {
    console.log('Controller Activated');

    $scope.contacts = [];

    var avatarColors = [
        "positive-bg",
        "calm-bg",
        "balanced-bg",
        "assertive-bg",
        "royal-bg"
    ];

    var authPromise = ParseService.getAllContacts();

    authPromise.success(function(data) {

        var contacts = data.results;

        $scope.contacts = contacts.map(function(contact) {
            // add a random color for their avatar
            var avatarIndex = Math.floor(Math.random() * avatarColors.length);
            contact.avatarColor = avatarColors[avatarIndex];

            // generate their avatar text: their first initialis
            contact.avatarText = contact.first_name.charAt(0) + contact.last_name.charAt(0);

            return contact;
        });

    }).error(function(data) {
        console.log(data.error);
    });

    $scope.specificContact= function(contactId) {
        ParseService.current_contact_id = contactId;
    };

    // var contacts = [{
    //     firstName: "Joe",
    //     lastName: "Kahn",
    //     title: "Software Engineer",
    //     company: "Google Inc."
    // }, {
    //     firstName: "Neel",
    //     lastName: "Mehta",
    //     title: "Designer",
    //     company: "Apple Inc."
    // }, {
    //     firstName: "Sherman",
    //     lastName: "Leung",
    //     title: "Project Manager",
    //     company: "Facebook Inc."
    // }];

}]);
