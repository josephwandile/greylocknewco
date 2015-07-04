var AccountFactory = angular.module('AccountFactory', [])

AccountFactory.factory('AccountFactory', ['$firebaseAuth', ($firebaseAuth) => {

    let usersRef = new Firebase('https://201gc.firebaseio.com/users');
    let auth = $firebaseAuth(usersRef);
    let authData = undefined;

    // handler for user authentication
    auth.$onAuth((data) => {

        if (!!data) {

            authData = data;

            let googleInfo = authData.google.cachedUserProfile;

            let newUser = new Firebase('https://201gc.firebaseio.com/users/' + authData.uid);

            newUser.set({

                first_name: googleInfo.given_name,
                last_name: googleInfo.family_name,
                picture: googleInfo.picture

            });
        }

    });

    let AccountFactory = {};

    // open google auth to log in, or log out
    AccountFactory.logIn = () =>
        auth.$authWithOAuthPopup('google');
    AccountFactory.logOut = () =>
        auth.$unauth();
    // check if user is logged in
    AccountFactory.isLoggedIn = () => !!authData;
    // get user info
    AccountFactory.getAuthData = () => authData;

    return AccountFactory;

}]);