var Parse = require('parse').Parse;
setup()

/**
 * Initializes the global `Parse` variable with secret keys
 * @return null
 */
function setup() {
  Parse.initialize("VurVg5WSqG0AH9ui3Avf8wEBJxLEUZ1FgdvxXeKL", "YOptVhvEs5IWiSPPKO8z9V59dbeK0SiZBzLzZRlT");
}

// Table Objects from Parse
var ActionItem = Parse.Object.extend("action_item");
var Contact    = Parse.Object.extend("contact");
var Meeting    = Parse.Object.extend("meeting");

/**
 * Returns an extended Parse.Object instance
 * configured to the target table.
 * @param  {string} tableName name of the table to fetch
 * @return {Parse.Object}     table instance
 */
function fetchTable(tableName) {
  // var Table = new Parse.Object.extend(tableName);
  // return new Table();
}

/**
 * Returns an array of all action items in the database
 * @return Array[ActionItem] Action items in the DB
 */
function fetchAllActionItems() {
  var queryObject = new Parse.Query(ActionItem);
  queryObject.find({
    success: function (results) {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
    },
    error: function (error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}

/**
 * Converts a specified contact ID into a contact object
 * @param  {string} contact_id the id of the contact to fetch
 * @return {Contact}            the full contact object, or null if invalid
 */
function getContactByID(contact_id) {
  var query = new Parse.Query(Contact);
  // Add constraints
  query.equalTo("objectId", contact_id);
  query.limit(1);
  query.first({
    success: function(object) {
      return object;
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
  return null;
}



/**
 * DEBUGGING FUNCTIONS
 */
function makeContact() {
  // Chosen by dice roll, guaranteed to be random
  return {
    first_name: "Sherman",
    last_name: "Leung",
    email: "skleung@stanford.edu",
    phone: "3013256815",
    profile: "https://www.linkedin.com/in/shleung"
  };
}

function makeActionItem(contact_id) {
  return {
    contact: contact_id,
    date: null,
    link: "http://www.google.com/",
    text: "Hello there!",
    type: "TIP"
  };
}

function makeMeeting() {
  return null;
}

function main() {
  fetchAllActionItems()
}

main()

// Handle exporting globals so that other javascript files that `require` api.js have access to them
module.exports.fetchAllActionItems = fetchAllActionItems;
// module.exports.x = x;
// module.exports.x = x;
// module.exports.x = x;