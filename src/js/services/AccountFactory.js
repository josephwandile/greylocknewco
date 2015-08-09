'use strict';

var AccountFactory = angular.module('AccountFactory', [])
.factory('AccountFactory', AccountFactory);

AccountFactory.$inject = ['$firebaseAuth', '$firebaseObject'];

AccountFactory = ($firebaseAuth, $firebaseObject) => {

  let AccountFactory = {};

  let ref = new Firebase('https://201gc.firebaseio.com/questions');

  AccountFactory.auth = $firebaseAuth(ref);
  AccountFactory.authData = undefined;

  // Handler for user authentication
  AccountFactory.auth.$onAuth((data) => {
    if (!!data) {

      AccountFactory.authData = data;

      let googleInfo = AccountFactory.authData.google.cachedUserProfile;

      // Creates unique ID for user... Ex: 'google:1234'
      let userRef = new Firebase('https://201gc.firebaseio.com/users/' +
        AccountFactory.authData.uid);

      // Create a synchronized version
      AccountFactory.user = $firebaseObject(userRef);

      AccountFactory.user.$loaded().then(() => {

        // Initialize user here if they don't already exist
        let user = AccountFactory.user;

        // If new user...
        if (!user.firstName) {
          user.firstName = googleInfo.given_name;
          user.lastName = googleInfo.family_name;
          user.picture = googleInfo.picture;
          user.$save();
        }
      });
    }
  });

  // Open google auth to log in, or log out
  AccountFactory.logIn = () => {
    AccountFactory.auth.$authWithOAuthPopup('google');
  };

  AccountFactory.logOut = () => {
    AccountFactory.auth.$unauth();
    AccountFactory.authData = null;
  };

  // Check if user is logged in
  AccountFactory.isLoggedIn = () => !!AccountFactory.authData;

  // Get user info
  AccountFactory.getAuthData = () => AccountFactory.authData;

  return AccountFactory;

};
