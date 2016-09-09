const {app} = require('electron');

const ego = require('./google-oauth-util.js');

const auth = ego();
const preventQuit = e => e.preventDefault();

const CLIENT_ID = '592125735781-od90csmu09elfoj6kebfph0p9fdo61oh.apps.googleusercontent.com';
const CLIENT_SECRET = 'RmapVGVnxXyxMjXxoi8IHDjN';
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

app.on('will-quit', preventQuit);

app.on('ready', () => {
	auth.getAccessToken(
		SCOPES,
		CLIENT_ID,
		CLIENT_SECRET
	)
	.then(token => {
		process.stdout.write(JSON.stringify(token, null, 2));
		app.removeListener('will-quit', preventQuit);
		app.quit();
	})
	.catch(err => {
		process.stderr.write(err.message + '\n');
	});
});
