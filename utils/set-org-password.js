const createConnection = require('jsforce-connection').connectionAndIdentity;
const UUID = require('uuid');
const fetch = require('node-fetch');

process.on('unhandledRejection', function(reason, p) {
  console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

// Configure from environment
const dotenv = require('dotenv');
dotenv.load({ silent: true });

createConnection()
  .then( ({ connection: salesforceApi, identity }) => {
    const instanceUrl = salesforceApi.instanceUrl;
    const accessToken = salesforceApi.accessToken;
    const username    = identity.username;
    const userId      = identity.user_id;
    const newPassword = UUID.v4();

    return setOrgPassword(
      salesforceApi.instanceUrl,
      salesforceApi.accessToken,
      username,
      userId,
      newPassword);
  })
  .catch( err => {
    console.error(err.stack);
    process.exit(1);
  });

function setOrgPassword(instanceUrl, accessToken, username, userId, newPassword) {
  const setPasswordUrl = `${instanceUrl}/services/data/v29.0/sobjects/User/${userId}/password`;

  return fetch(setPasswordUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        NewPassword: newPassword
      })
    })
    .then(function(response) {
      const status = response.status;
      if (status >= 300) { throw new Error(`Request status ${status} for ${setPasswordUrl}`) }

      console.log(`-----> Salesforce login: ${username} / ${newPassword}`);
      // Do not attempt JSON parsing for empty response
      return status === 204 ? null : response.json();
    });
}

