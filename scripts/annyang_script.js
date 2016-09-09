APIAI_TOKEN = '0fd4021de2954421b6570c089d9a39c6';

// Require annyang
const annyang = require('annyang');
// Require api.ai
const apiai = require('apiai');
var app = apiai(APIAI_TOKEN);

// Turn on debug messages
annyang.debug();
console.log("annyang_script is loaded");
// Define sample command
var commands = {
  'hello': function() {
    console.log('world');
  },
  // Default option (let apiai handles)
  '*text': function(text) {

    var request = app.textRequest(text);

    request.on('response', handleResp);

    request.on('error', function(error) {
      console.log(error);
    });

    request.end();
  }
};
// Add our commands to annyang
annyang.addCommands(commands);
// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start();
