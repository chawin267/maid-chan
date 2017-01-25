// const {
//   app
// } = require('electron');

// const ego = require('./scripts/google-oauth-util.js');
const ego = require('./google-oauth-util.js');
const auth = ego();

const CLIENT_ID = '592125735781-od90csmu09elfoj6kebfph0p9fdo61oh.apps.googleusercontent.com';
const CLIENT_SECRET = 'RmapVGVnxXyxMjXxoi8IHDjN';
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const google = require('googleapis');
const gmail = google.gmail('v1');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob'
);
google.options({
  auth: oauth2Client
});

var maxResults = 5;
var messagesId;

function handleEmailCheck(response) {

  auth.getAccessToken(
      SCOPES,
      CLIENT_ID,
      CLIENT_SECRET
    )
    .then(token => {
      // DEBUG
      process.stdout.write(JSON.stringify(token, null, 2));

      oauth2Client.setCredentials({
        access_token: token.access_token,
        refresh_token: token.refresh_token
      });

      // retrieve list of messages' id
      gmail.users.messages.list({
        userId: 'me',
        maxResults: maxResults
      }, function(err, response) {
        // handle err and response
        // DEBUG
        console.log(response);
        messagesId = response.messages;

        for (i = 0; i < maxResults; i++) {
          gmail.users.messages.get({
            userId: 'me',
            id: messagesId[i].id,
          }, function(err, response) {
            console.log(err);

          });
        }
      });

    })
    .catch(err => {
      process.stderr.write(err.message + '\n');
    });


}
