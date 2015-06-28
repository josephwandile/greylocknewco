var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', /*'$route', */ /*'$window', */ '$location', 'ParseService', function($scope, $location, ParseService /*, $route*/ /*, $window*/ ) {
    console.log('Controller Activated');

    $scope.questions = ParseService.getQuestions(0, 3);
    $scope.input = {};

    $scope.submitForm = function() {

        var contacts = [];

        var payload = ParseService.sanitizePayload($scope.input);

        var authPromise = ParseService.getAllContacts();

        authPromise.success(function(data) {

            // Used to check if current entry already exists as contact
            var contacts = data.results;

            var first_name = payload['first_name'];
            var last_name = payload['last_name'];
            var location = payload['location'];

            // Parsing data correctly; this should never be an empty string
            var day = payload['met_at'].getDay();
            var month = payload['met_at'].getMonth();
            var year = payload['met_at'].getFullYear();
            var met_at = year + '-' + month + '-' + day + 'T';

            var type = payload['type'].toUpperCase();

            var matches = false;
            var current_contact_id = '';

            // Searching to see if contact already exists
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].first_name === first_name && contacts[i].last_name === last_name) {
                    matches = true;
                    current_contact_id = contacts[i].objectId;
                };
            };

          	// New contact
            if (matches === false) {

                var authPromise = ParseService.createContact({
                    'first_name': first_name,
                    'last_name': last_name
                });

                authPromise.success(function(data) {

                    // Save current contact ID
                    ParseService.current_contact_id = data.objectId;

                    // Creating meeting to be updated later
                    var authPromise = ParseService.createMeeting({
                        'contact': {
                            __type: 'Pointer',
                            className: "contact",
                            // Adding meeting with new user's ID
                            objectId: data.objectId
                        },
                        'met_at': Date.parse(met_at),
                        'type': type,
                        'location': location
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
            } else {
                // Contact already exists
                ParseService.current_contact_id = current_contact_id;

                var authPromise = ParseService.createMeeting({
                    'contact': {
                        __type: 'Pointer',
                        className: "contact",
                        objectId: current_contact_id
                    },
                    'met_at': Date.parse(met_at),
                    'type': type,
                    'location': location
                }).success(function(data) {
                    // var contact = data.get("contact");
                    // var email = contact.get("email");

                    // // create and save the action item
                    // var newActionItemData = {
                    //   contact: contact,
                    //   type: "REMINDER",
                    //   text: "Send a follow up email to " + contact.get('first_name'),
                    //   link: "mailto:" + email,
                    //   date: new Date()
                    // }
                    // ParseService.createActionItem(newActionItemData);

                    // Added meeting
                    ParseService.current_meeting_id = data.objectId;

                    // Update meeting here
                    $location.path('tab/add/meeting');

                }).error(function(data, status) {
                    console.log(status)
                });
            }

        }).error(function() {
        	// Couldn't retrieve contacts
            console.log(status);
        });
    }
}]);