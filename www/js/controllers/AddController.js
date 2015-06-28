var AddController = angular.module('AddController', []);

AddController.controller('AddCtrl', ['$scope', '$location', 'ParseService',
    function($scope, $location, ParseService) {
        console.log('Controller Activated');

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
        // $location.path('/feed');

        /*  // $route.reload();
          $window.reload();*/

        // check name against backend...


        /*Render the first form. Add logic to route to necessary second form, either to
        profile, or to meeting...*/

        // // Profile Creation

        // check: existing Profile

        // 	yes: update contact

        // 		send: meeting data

        // 			type, met_at,

        // 	no: new contact

        // 		create contact

        // 			send: contact data

        // 		get objectID

        // 		send: meeting data

        // 		update contact

    }
]);
