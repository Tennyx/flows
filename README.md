# FLOWS
Various OIDC and OAuth Flows without SDKs. Okta as IDP. Node as backend.

## OKTA DASHBOARD STEPS
* If you don't already have an Okta Developer org, create one [here](https://developer.okta.com/).
* Ensure `http://localhost:8080` is listed as a trusted CORS origin in `Security` -> `API`. 
### Create Multiple Apps for the Various Flows
* Go to `Applications` -> `Applications`. 
* Click `Add Application`.
* Click `Create New App`.
* From the dropdown select the following depending on the flow you are setting up:
  - **Implicit Flow**: `Single Page App (SPA)`.
  - **Authorization Flow**: `Web`. Sign on method should be `OpenID Connect`.
  - **PKCE Flow**: `Single Page App (SPA)`.
  - **Resource Owner Flow**: `Native app`.
  - **Client Credentials Flow**: `OAuth Service`.
* Click `Create`.
* Name the application, and add the following to `Login redirect URIs` depending on the flow you are setting up:
  - **Implicit Flow**:`http://localhost:8080/implicit-flow`.
  - **Authorization Flow**:`http://localhost:8080/auth-flow`.
  - **PKCE Floww**:`http://localhost:8080/pkce-flow`.
  - **Resource Owner Flow**:`http://localhost:8080/resource-owner-flow`.
  - **Client Credentials Flow**:`http://localhost:8080/client-credentials-flow`.
* On the following screen, take note of your `Client ID` & `Client Secret`. You will need these for the Node App. The **Implicit Flow** and **PKCE Flow** will only have `Client ID`.

### Note for the Client Credentials Flow:
* This flow requires a custom scope in your Authorization call which requires a custom Authorization Server. Go to `Security` -> `API`. Click `Add Authorization Server`. Add a `Name`, `Audience` & `Description`.
* On the next screen, take note of your `Issuer` URL. You will need this for the Node app.
* Go to the `scopes` tab, and click `Add Scope`. Give it a `Name` and `Description` and take note of the name for the Node app.
* Tab over to `Access Policies` and click `Add New Access Policy`. Name it `Client Credentials` and assign it to the **Client Credentials** app you made in the previous step.
* Your policy should now appear in the side bar. Click `Add Rule`.
  - Name your rule. 
  - For `Grant Type` check only the `Client Credentials` box.
  - User is `Any user assigned the app.`
  - Scopes Requested: `The following scopes`: Add the custom scope name you created in previous steps.
  - Leave the rest of the defasults and click `Create Rule.`
 * Feel free to tab over to **Token Preview** and test out the custom scope before implementing in the Node app.

## NODE APP STEPS

* Download this repository. In terminal, `cd` to the folder and run `npm install`
* Locate `customVars.js` and replace all the variables with your personal Okta Org data created in **OKTA DASHBOARD STEPS**.
* Change `customVars.js` filename to `localVars.js`.
* In terminal, run `node server.js`.
* In a browser, navigate to `http://localhost:8080` to start using the app.



