var AccountFactory = angular.module('AccountFactory', [])

AccountFactory.factory('AccountFactory', ['$firebaseAuth', '$firebaseObject', ($firebaseAuth, $firebaseObject) => {

    let AccountFactory = {};

    let ref = new Firebase('https://201gc.firebaseio.com/questions');
    AccountFactory.auth = $firebaseAuth(ref);
    AccountFactory.authData = undefined;

    // handler for user authentication
    AccountFactory.auth.$onAuth((data) => {
        if (!!data) {
            // user authenticated, add a new person to the firebase DB'
            // TODO(neel): if the user already exists, don't overwrite them
            AccountFactory.authData = data;

            let googleInfo = AccountFactory.authData.google.cachedUserProfile;

            let userRef = new Firebase('https://201gc.firebaseio.com/users/' +
                AccountFactory.authData.uid);
            // create a synchronized version
            AccountFactory.user = $firebaseObject(userRef);

            AccountFactory.user.$loaded().then(() => {
                // initialize user here if they don't already exist
                let user = AccountFactory.user;

                if (!user.first_name) {
                    user.first_name = googleInfo.given_name;
                    user.last_name = googleInfo.family_name;
                    user.picture = googleInfo.picture;
                    user.$save();
                }
            });
        }
    });

    // open google auth to log in, or log out
    AccountFactory.logIn = () =>
        AccountFactory.auth.$authWithOAuthPopup('google');
    AccountFactory.logOut = () => {
            AccountFactory.auth.$unauth();
            AccountFactory.authData = null;
        }
        // check if user is logged in
    AccountFactory.isLoggedIn = () => !!AccountFactory.authData;
    // get user info
    AccountFactory.getAuthData = () => AccountFactory.authData;

    // public-accessible fields:
    // - user
    // - auth
    // - authData

    return AccountFactory;

}]);
