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
 * @return Array[ActionItem] [description]
 */
function fetchAllActionItems() {
  console.log("Here");
  // var actionItemTable = fetchTable('action_item');
  var ActionItem = Parse.Object.extend("action_item");
  var queryObject = new Parse.Query(ActionItem);
  queryObject.find({
    success: function (results) {
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        console.log("Got a result!");
      }
    },
    error: function (error) {
      console.log("Error");
      alert("Error: " + error.code + " " + error.message);
    }
  });
}



/**
 * DEBUGGING FUNCTIONS
 */
function randomContact() {
  // Chosen by dice roll, guaranteed to be random
  return {
    first_name: "Sherman",
    last_name: "Leung",
    email: "skleung@stanford.edu",
    phone: "3013256815",
    profile: "https://www.linkedin.com/in/shleung"
  };
}

function randomActionItem() {
  return null;
}

function randomMeeting() {
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