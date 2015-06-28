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
            var met_at = $scope.input['met_at'];
            var type = payload['type'].toUpperCase();

            var matches = false;
            var current_contact_id = '';
            var current_email = '';

            // Searching to see if contact already exists
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].first_name === first_name && contacts[i].last_name === last_name) {
                    matches = true;
                    current_contact_id = contacts[i].objectId;
                    current_email = contacts[i].email;
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
                    var current_contact_id = data.objectId;

                    // Creating meeting to be updated later
                    var authPromise = ParseService.createMeeting({
                        'contact': {
                            __type: 'Pointer',
                            className: "contact",
                            // Adding meeting with new user's ID
                            objectId: data.objectId
                        },
                        'met_at': ParseService.createDate(met_at),
                        'type': type,
                        'location': location
                    }).success(function(data) {

                        // Added meeting, saving id
                        ParseService.current_meeting_id = data.objectId;

                        // Go to profile questions; meeting will be updated later
                        $location.path('tab/add/profile/'+current_contact_id+'/'+data.objectId);
                    }).error(function(data, status) {
                        console.log(status);
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
                    'met_at': ParseService.createDate(met_at),
                    'type': type,
                    'location': location
                }).success(function(data) {
                    var actionItemDate = met_at.getTime() + 60*60*24*1000;
                    var newDate = new Date(actionItemDate);
                    var newActionItemData = {
                        date: ParseService.createDate(newDate),
                        type: "REMINDER",
                        text: "You met " + payload['first_name'] + " yesterday - send a follow up!",
                        link: "mailto:"+current_email,
                        contact: {
                            "__type": "Pointer",
                            "className": "contact",
                            "objectId": current_contact_id
                        }
                    };
                    var createActionItemPromise = ParseService.createActionItem(newActionItemData);
                    createActionItemPromise.success(function(data) {
                        console.log("action item created with id=" + data.objectId);
                    }).error(function(data, status, config, headers) {
                        console.log(headers);
                    });
                    // Added meeting
                    ParseService.current_meeting_id = data.objectId;

                    // Update meeting here
                    $location.path('tab/add/meeting/'+data.objectId);

                }).error(function(data, status, config, headers) {
                    console.log(status)
                });
            }

        }).error(function() {
        	// Couldn't retrieve contacts
            console.log(status);
        });
    }
}]);
