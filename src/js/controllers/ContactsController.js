var ContactsController = angular.module('ContactsController', []);

ContactsController.filter('fancify', ['UtilsFactory', function(UtilsFactory) {
  // makes contacts prettier (adds an avatar bubble, for instance)
  return function(input) {
    for (var i = 0; i < input.length; i++) {
      var contact = input[i];
      contact.avatarColor = UtilsFactory.getAvatarColor(contact);
      contact.avatarText = UtilsFactory.getAvatarText(contact);
    }
    return input;
  };
}]);

ContactsController.controller('ContactsCtrl', ['$scope', 'ParseService', '$location', '$rootScope',
  function($scope, ParseService, $location, $rootScope) {
    console.log('Contacts Controller Activated');
  }
]);
