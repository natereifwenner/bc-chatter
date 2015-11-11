'use strict';

var _ = require('lodash');
var http = require('http');
var Search = require('./search.model');
var request = require('request');
var async = require('async');

var config = require('../../config/local.env');

var client_id = config.CLIENT_ID;
var client_secret = config.CLIENT_SECRET;
var bc_account = config.BRIGHTCOVE_ACCOUNT;
var bc_media_api_token = config.BRIGHTCOVE_MEDIA_API_TOKEN;

var auth_string = new Buffer(client_id + ":" + client_secret).toString('base64');
var auth = {};

exports.videoSearch = function(req, res) {
  //var body = '';
  if(req.query.page){
      var x = 
        request('http://api.brightcove.com/services/library?command=search_videos&any=:'
        + req.query.q +'&page_size=20&page_number=' 
        + req.query.page 
        + '&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=' + bc_media_api_token
        , function (error, response, body) {
          var data = JSON.parse(body);
          res.json(201, data);
        });
    }else{
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'
          + req.query.q 
          +'&page_size=20&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=' + bc_media_api_token
          , function (error, response, body) {
          var data = JSON.parse(body);
          res.json(201, data);
        });
    }
};

//TODO: When the application sits open for awhile, requesting playlist uses previous and expired auth key
//TODO: Make a sepearate call to return playlist length to help identify master playlist id
exports.playlistSearch = function(req, res) {
  var getToken = request({
    method: 'POST',
    url: 'https://oauth.brightcove.com/v3/access_token',
    headers: {
      'Authorization': 'Basic ' + auth_string,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  }, function (error, response, body) {
    var str = JSON.parse(body);
    auth = str.access_token;
    console.log(auth);
    return auth;
  });
  var x = request({
    method: 'GET',
    url: 'https://cms.api.brightcove.com/v1/accounts/' + bc_account + '/videos/' + req.query.id +'/references',
    headers: {
      'Authorization': 'Bearer ' + auth,
      'Content-Type': 'application/json'
    },
    body: "{}"
  }, function (error, response, body) {
    var obj = JSON.parse(body);
    res.json(201, obj);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}