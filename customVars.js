  //******* Customize your variables below to run yourself. *******\\
 //		   ~~~THEN CHANGE THIS FILENAME TO localVars.js~~~ 			\\											    \\
//*******************************************************************\\

const authServerDefault = '{ YOUR OKTA DOMAIN }/oauth2/v1';

// For Client Credentials Flow - custom scope needed.
const authServerCustom = '{ YOUR OKTA DOMAIN }/oauth2/{ CUSTOM SERVER ID }/v1';

// Client ID for your Okta SPA App, Implicit Flow.
const impClientId = '{ APP CLIENT ID }';

// Client ID, Client Secret and Header for your Okta Web App, Authorization Flow.
const acClientId = '{ APP CLIENT ID }'; 							
const acClientSecret = '{ APP CLIENT SECRET }';	
const acHeader = Buffer.from(`${acClientId}:${acClientSecret}`).toString('base64');

// Client ID for your Okta SPA App, Authorization Flow w/ PKCE.
const pkceClientId = '{ APP CLIENT ID }';

// Client ID, Client Secret and Header for your Okta Native App, Resource Owner Flow.
const roClientId = '{ APP CLIENT ID }'; 							
const roClientSecret = '{ APP CLIENT SECRET }';
const roHeader = Buffer.from(`${roClientId}:${roClientSecret}`).toString('base64');

// Client ID, Client Secret and Header for your Okta OAuth Service App, Client Credentials Flow.
const customScope = '{ CUSTOM SCOPE }';
const ccClientId = '{ APP CLIENT ID }';						
const ccClientSecret = '{ APP CLIENT SECRET }';
const ccHeader = Buffer.from(`${ccClientId}:${ccClientSecret}`).toString('base64');

 //***************************************************************\\
//******** Customize your variables above to run yourself. ********\\


module.exports.authServerDefault = authServerDefault;
module.exports.authServerCustom = authServerCustom;
module.exports.impClientId = impClientId;
module.exports.acClientId = acClientId;
module.exports.acClientSecret = acClientSecret;
module.exports.acHeader = acHeader;
module.exports.pkceClientId = pkceClientId;
module.exports.roClientId = roClientId;
module.exports.roClientSecret = roClientSecret;
module.exports.roHeader = roHeader;
module.exports.customScope = customScope;
module.exports.ccClientId = ccClientId;
module.exports.ccClientSecret = ccClientSecret;
module.exports.ccHeader = ccHeader;