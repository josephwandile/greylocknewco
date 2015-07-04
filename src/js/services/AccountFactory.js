var AccountFactory = angular.module('AccountFactory', [])

AccountFactory.factory('AccountFactory', ['$firebaseAuth', ($firebaseAuth) => {

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
            let newUser = new Firebase('https://201gc.firebaseio.com/users/' +
                AccountFactory.authData.uid);

            newUser.set({
                first_name: googleInfo.given_name,
                last_name: googleInfo.family_name,
                picture: googleInfo.picture
            });
        }
    });

    // open google auth to log in, or log out
    AccountFactory.logIn = () =>
        AccountFactory.auth.$authWithOAuthPopup('google');
    AccountFactory.logOut = () =>
        AccountFactory.auth.$unauth();
    // check if user is logged in
    AccountFactory.isLoggedIn = () => !!AccountFactory.authData;
    // get user info
    AccountFactory.getAuthData = () => AccountFactory.authData;

    return AccountFactory;

}]);
