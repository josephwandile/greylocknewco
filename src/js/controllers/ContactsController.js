var ContactsController = angular.module('ContactsController', []);

ContactsController.filter('fancify', function() {
    // makes contacts prettier (adds an avatar bubble, for instance)
  var avatarColors = [
    "positive-bg",
    "calm-bg",
    "balanced-bg",
    "assertive-bg",
    "royal-bg"
  ];
  return function(input) {
    for (var i = 0; i < input.length; i++) {
      var contact = input[i];
      // add a random color for their avatar (hash on first letter of name)
      var avatarIndex = contact.first_name.charCodeAt(0) % avatarColors.length;
      contact.avatarColor = avatarColors[avatarIndex];

      // generate their avatar text: their first initials
      var firstInitial = contact.first_name ? contact.first_name.charAt(0) : "";
      var lastInitial = contact.last_name ? contact.last_name.charAt(0) : "";
      var initials = firstInitial + lastInitial;
      contact.avatarText = initials.toUpperCase();
    }
    return input;
  };
})

ContactsController.controller('ContactsCtrl', ['$scope', 'ParseService', '$location', '$rootScope',
    function($scope, ParseService, $location, $rootScope) {
    console.log('Contacts Controller Activated');



    // $scope.enhancedContacts = [];
    //
    // $scope.$watch('contacts', function(newVal, oldVal){
    //     console.log(newVal);
    //     console.log(oldVal);
    //
    //     // map won't work
    //     console.log(oldVal.length);
    //
    //     newVal.forEach((x) => {
    //         console.log(x);
    //     });
    //
    //     newVal.map((x) => {
    //         console.log(x);
    //     });
    //
    //     $scope.enhancedContacts = newVal.map(function(contact) {
    //         console.log(contact);
    //             // add a random color for their avatar
    //             var avatarIndex = Math.floor(Math.random() * avatarColors.length);
    //             contact.avatarColor = avatarColors[avatarIndex];
    //
    //             // generate their avatar text: their first initials
    //             var firstInitial = contact.first_name ? contact.first_name.charAt(0) : "";
    //             var lastInitial = contact.last_name ? contact.last_name.charAt(0) : "";
    //             var initials = firstInitial + lastInitial;
    //             contact.avatarText = initials.toUpperCase();
    //
    //             return contact;
    //     });
    //
    //     console.log($scope.enhancedContacts);
    // });
    //
    // var authPromise = ParseService.getAllContacts();
    //
    // authPromise.success(function(data) {
    //
    //     var contacts = data.results;
    //
    //     $scope.contacts = contacts.map(function(contact) {
    //         // add a random color for their avatar
    //         var avatarIndex = Math.floor(Math.random() * avatarColors.length);
    //         contact.avatarColor = avatarColors[avatarIndex];
    //
    //         // generate their avatar text: their first initials
    //         var firstInitial = contact.first_name ? contact.first_name.charAt(0) : "";
    //         var lastInitial = contact.last_name ? contact.last_name.charAt(0) : "";
    //         var initials = firstInitial + lastInitial;
    //         contact.avatarText = initials.toUpperCase();
    //
    //         return contact;
    //     });
    //
    // }).error(function(data) {
    //     console.log(data.error);
    // });
    //
    $scope.specificContact = function(contactId) {
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
