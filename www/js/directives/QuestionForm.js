var QuestionForm = angular.module('QuestionForm', []);

QuestionForm.directive('questionForm', [function() {
    return {
        templateUrl: '../templates/question-form.html',
        link: function(scope, element, attrs) {
            scope.input = {};

            // modify the given questions
            scope.questions = scope.questions.map(function(question) {
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
        }
    };
}]);
