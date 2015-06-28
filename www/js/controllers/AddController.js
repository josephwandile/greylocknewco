var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', /*'$route', */ /*'$window', */ '$location', 'ParseService', function($scope, $location, ParseService /*, $route*/ /*, $window*/ ) {
    console.log('Controller Activated');

    $scope.input = {};

    $scope.questions = ParseService.getQuestions(0, 3).map(function(question) {
        // check question's items
        // alternatives:
        // * all checkboxes
        // * all radios
        // * all textareas
        // * a mix of other inputs, like text, email, number, etc.
        // checkboxes and radios get special rendering

        // just check if the first item is a checkbox or radio or textarea,
        // because if one is the rest should all be
        question.type = "standard";
        if (question.items[0].type == "textarea") {
            question.type = "textarea";
        } else if (question.items[0].type == "radio") {
            question.type = "radio";
        } else if (question.items[0].type == "checkbox") {
            question.type = "checkbox";
        }
        return question;
    });

    $scope.submitForm = function() {

        var contacts = [];

        var authPromise = ParseService.getAllContacts();

        authPromise.success(function(data) {

            var contacts = data.results;

            console.log("Test", contacts)

            var first_name = $scope.input['first_name'];

            debugger;

            var last_name;
            var location;
            var met_at;
            var type;



            // $scope.input['first_name'] = 'New';
            // $scope.question.inputlast_name = 'User';
            // $scope.location = 'FB Recruiting Event';
            // $scope.met_at = '2015-07-13T';
            // $scope.type = 'Recruiting';

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
    }
}]);