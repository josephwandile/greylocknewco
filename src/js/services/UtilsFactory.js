let UtilsFactory = angular.module('UtilsFactory', []);

UtilsFactory.factory('UtilsFactory', () => {

  let UtilsFactory = {};

  /**
   * Generates a random Ionic CSS color class for the given contact.
   * @param  {Firebase} contact An element of a $firebaseArray.
   * @return {String}         an Ionic CSS class.
   */
  UtilsFactory.getAvatarColor = (contact) => {
    let avatarColors = [
      "positive-bg",
      "calm-bg",
      "balanced-bg",
      "assertive-bg",
      "royal-bg"
    ];
    let avatarIndex = contact.$id.charCodeAt(0) % avatarColors.length;
    return avatarColors[avatarIndex];
  };

  /**
   * Returns the text to be shown on a contact's avatar circle. For now,
   * the contact's initials.
   * @param  {Firebase} contact An element of a $firebaseArray.
   * @return {String}         The contacts initials.
   */
  UtilsFactory.getAvatarText = (contact) => {
    let firstInitial = contact.first_name ? contact.first_name.charAt(0) : "";
    let lastInitial = contact.last_name ? contact.last_name.charAt(0) : "";
    let initials = firstInitial + lastInitial;
    return initials.toUpperCase();
  }

  return UtilsFactory;

});
