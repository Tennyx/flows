const express = require('express');
const axios = require('axios');
const http = require('http');
const url = require('url');
const njwt = require('njwt');
const qs = require('qs');
const localVars = require('./localVars');

let app = express();
let port = process.env.PORT || 8080;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

  
  //******* Customize your variables on customVars.js then ********\\
 //	    change filename to localVars.js which is git ignored		\\			
//*******************************************************************\\


// Home.

app.get('/', function(req, res) {
	res.render('home', {
						'error' : '',
						'authServerDefault' : localVars.authServerDefault,
						'impClientId' : localVars.impClientId,
						'acClientId' : localVars.acClientId,
						'pkceClientId' : localVars.pkceClientId
						});
});

// Implicit Flow. All done on the front end.

app.get('/implicit-flow', function(req, res) {
	res.render('flows/implicit-flow');
});

// Authorization Code Flow.

app.get('/auth-flow', function(req, res) {
	const authCode = req.query.code;


	const data = qs.stringify({
		'grant_type' : 'authorization_code',
		'redirect_uri' : 'http://localhost:8080/auth-flow',
		'code' : authCode
	});

	axios.post(`${localVars.authServerDefault}/token`, data, {
		headers: {
			'Accept' : 'application/json',
			'Authorization' : `Basic ${localVars.acHeader}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	})
	.then(function (response) {
		res.render('flows/auth-flow', { 'idToken': response.data.id_token });
	})
	.catch(function (error) {
		console.log(error);
	});
});

// Authorization Code w/ PKCE Flow. All done on the front end.

app.get('/pkce-flow', function(req, res) {
	res.render('flows/pkce-flow');
});

// Resource Owner Flow.

app.post('/resource-owner-flow', function(req, res) {
	const email = req.body.email_field;
	const password = req.body.password_field;

	const data = qs.stringify({
		'grant_type' : 'password',
		'redirect_uri' : 'http://localhost:8080/resource-owner-flow',
		'username' : email,
		'password' : password,
		'scope' : 'openid'
	});

	axios.post(`${localVars.authServerDefault}/token`, data, {
		headers: {
			'Accept' : 'application/json',
			'Authorization' : `Basic ${localVars.roHeader}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	})
	.then(function (response) {
		res.render('flows/resource-owner-flow', { 'idToken': response.data.id_token });
	})
	.catch(function (error) {
		res.render('home', {
						'error' : 'Invalid Credentials.',
						'authServerDefault' : localVars.authServerDefault,
						'impClientId' : localVars.impClientId,
						'acClientId' : localVars.acClientId,
						'pkceClientId' : localVars.pkceClientId
						});
	});
});

// Client Credentials Flow. No user involved, but added to front end to initiate backend call.

app.get('/client-credentials-flow', function(req, res) {
	
	const data = qs.stringify({
		'grant_type' : 'client_credentials',
		'scope' : localVars.customScope
	});

	axios.post(`${localVars.authServerCustom}/token`, data, {
		headers: {
			'Accept' : 'application/json',
			'Cache-Control' : 'no-cache',
			'Authorization' : `Basic ${localVars.ccHeader}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	})
	.then(function (response) {
		res.render('flows/client-credentials-flow', { 'accessToken': response.data.access_token });
	})
	.catch(function (error) {
		console.log(error);
	});

});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});