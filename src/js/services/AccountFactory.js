var AccountFactory = angular.module('AccountFactory', [])

AccountFactory.factory('AccountFactory', ['$firebaseAuth', ($firebaseAuth) => {

    let AccountFactory = {};

    let ref = new Firebase('https://201gc.firebaseio.com/questions');
    AccountFactory.auth = $firebaseAuth(ref);
    AccountFactory.authData = undefined;

    // handler for user authentication
    AccountFactory.auth.$onAuth((data) => {
        AccountFactory.authData = data;
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
