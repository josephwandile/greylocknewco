var AccountFactory = angular.module('AccountFactory', [])

AccountFactory.factory('AccountFactory', ['$firebaseAuth', ($firebaseAuth) => {

    let ref = new Firebase('https://201gc.firebaseio.com/questions');
    let auth = $firebaseAuth(ref);
    let authData = undefined;

    // handler for user authentication
    auth.$onAuth((data) => {
        authData = data;
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
