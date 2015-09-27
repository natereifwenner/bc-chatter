# Brightcove Chatter
A basic MEAN stack application which gives users a UI interface that allows you to easily search for videos within your Brightcove account

### Installation
This is a MEAN stack app and requires Node.js, NPM, and MongoDB. The other dependencies can be install by running

`$ npm install --save`

### Configuration
This application utilizes both Brightcove's [CMS API](http://docs.brightcove.com/en/video-cloud/cms-api/getting-started/overview-cms.html) and their older [Media API](http://docs.brightcove.com/en/video-cloud/media/references/reference.html).
To get Brightcove Chatter up and running you will required to have access to your account number, oauth client id and secret, and Media API access token.

#### local.env.js
Update `server/config/environment/local.env.sample.js` with required API tokens and save file as `local.env.js`

### Start application

run `mongod` to start mongo db
run `grunt serve` in command line

