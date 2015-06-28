var ContactDetailController = angular.module('ContactDetailController', []);

ContactDetailController.controller('ContactDetailCtrl', ['$scope', 'ParseService', function($scope, ParseService) {
  console.log('Controller Activated');

  var avatarColors = [
        "positive-bg",
        "calm-bg",
        "balanced-bg",
        "assertive-bg",
        "royal-bg"
    ];

    var authPromise = ParseService.getContact("MyVXW1qXL1");

    authPromise.success(function(contact) {
        var avatarIndex = Math.floor(Math.random() * avatarColors.length);
        contact.avatarText = contact.first_name.charAt(0) + contact.last_name.charAt(0);
        contact.avatarColor = avatarColors[avatarIndex];
        $scope.contact = contact;
    }).error(function(data) {
        console.log(data.error);
    });
}]);