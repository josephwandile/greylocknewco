var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', /*'$route', */ /*'$window', */ '$location', 'ParseService', function($scope, $location, ParseService /*, $route*/ /*, $window*/ ) {
    console.log('Controller Activated');

    var contacts = [];

    var authPromise = ParseService.getAllContacts();

    authPromise.success(function(data) {

        var contacts = data.results;

        console.log("Test", contacts)

        $scope.first_name = 'New';
        $scope.last_name = 'User';
        $scope.location = 'FB Recruiting Event';
        $scope.met_at = '2015-07-13T';
        $scope.type = 'Recruiting';

        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].first_name !== $scope.first_name || contacts[i].last_name !== $scope.last_name) {
                if (i + 1 === contacts.length) {

                    // New contact
                    var authPromise = ParseService.createContact({
                        'first_name': $scope.first_name,
                        'last_name': $scope.last_name
                    });

                    authPromise.success(function(data) {

                        // Save current user ID
                        ParseService.current_contact_id = data.objectId;

                        // Creating meeting to be updated later
                        var authPromise = ParseService.createMeeting({
                            'contact': {
                                __type: 'Pointer',
                                className: "contact",
                                // Adding meeting with new user's ID
                                objectId: data.objectId
                            },
                            'met_at': Date.parse($scope.met_at),
                            'type': $scope.type,
                            'location': $scope.location
                        }).success(function(data) {

                            // Added meeting, saving id
                            ParseService.current_meeting_id = data.objectId;

                            // Go to profile questions; meeting will be updated later
                            $location.path('tab/add/profile');

                        }).error(function(data, status) {
                            console.log(status)
                        });

                    }).error(function(data, status) {
                        console.log(status);
                    });
                }
            } else {
                // Contact already exists
                ParseService.current_contact_id = contacts[i].objectId;

                var authPromise = ParseService.createMeeting({
                    'contact': {
                        __type: 'Pointer',
                        className: "contact",
                        objectId: contacts[i].objectId
                    },
                    'met_at': Date.parse($scope.met_at),
                    'type': $scope.type,
                    'location': $scope.location
                }).success(function(data) {

                    // Added meeting
                    ParseService.current_meeting_id = data.objectId;

                    // Update meeting here
                    $location.path('tab/add/meeting');

                }).error(function(data, status) {
                    console.log(status)
                });
            }
        }

    }).error(function(data, status) {
        console.log('Something went wrong.');
    });
}]);