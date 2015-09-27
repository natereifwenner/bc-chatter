'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'brightcoverequester-secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',

  //include brightcove oauth client id and secret. For more information please see http://docs.brightcove.com/en/video-cloud/oauth-api/getting-started/oauth-api-overview.html
  //CLIENT_ID: '',
  //CLIENT_SECRET: '',

  //include your brightcove account number and Media API token
  //BRIGHTCOVE_ACCOUNT: '',
  //BRIGHTCOVE_MEDIA_API_TOKEN: ''
};
