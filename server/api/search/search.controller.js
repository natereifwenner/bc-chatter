'use strict';

var _ = require('lodash');
var http = require('http');
var Search = require('./search.model');
var request = require('request');
var async = require('async');

var config = require('../../config/local.env');

var client_id = config.CLIENT_ID;
var client_secret = config.CLIENT_SECRET;

var auth_string = new Buffer(client_id + ":" + client_secret).toString('base64');
var auth = {};

exports.search = function(req, res) {
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
    return auth;
  });

  var x = request({
    method: 'GET',
    url: 'https://cms.api.brightcove.com/v1/accounts/981571817/videos?50updated_attags:foo+updated_at:2014-06-01..',
    headers: {
      'Authorization': 'Bearer ' + auth,
      'Content-Type': 'application/json'
    },
    body: "{}"
  }, function (error, response, body) {
     var str = JSON.parse(body);
    res.json(201, str);
  });
  async.parallel([
    function(callback) {
      var x = request({
        method: 'GET',
        url: 'https://cms.api.brightcove.com/v1/accounts/981571817/videos?50updated_attags:foo+updated_at:2014-06-01..',
        headers: {
          'Authorization': 'Bearer ' + auth,
          'Content-Type': 'application/json'
        },
        body: "{}"
        }, function (error, response, body) {
            if(error){ console.log(error); callback(true); return;}
            var obj = JSON.parse(body);
            callback(false, obj);
            //var str = JSON.parse(body);
        //res.json(201, str);
      });
    },
    function(callback) {
      if(req.query.page){
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'
          + req.query.q +'&page_size=20&page_number=' 
          + req.query.page 
          + '&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.'
          , function (error, response, body) {
            if(error){ console.log(error); callback(true); return;}
            var obj = JSON.parse(body);
            callback(false, obj);
            /*var str = JSON.parse(body);
            res.json(201, str);*/
          });
      }else{
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'
            + req.query.q 
            +'&page_size=20&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.'
            , function (error, response, body) {
            if(error){ console.log(error); callback(true); return;}
            var obj = JSON.parse(body);
            callback(false, obj);
            /*var str = JSON.parse(body);
            res.json(201, str);*/
          });
      }
    },
  ],
  /*
   * Collate results
   */
  function(error, results) {
    if(error) { console.log(error); res.send(500,"Server Error"); return; }
    //console.log({api1:results[0],api2:results[0]});
    res.json(201,{api1:results[0], api2:results[1]});
  }
  );
  
};
/*exports.search = function(req, res) {
  var body = '';
  if(req.query.page){
    console.log(req.query);
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'+ req.query.q +'&page_size=20&page_number=' + req.query.page + '&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.');
    }else{
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'+ req.query.q +'&page_size=20&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.');
    }
  req.pipe(x)
  x.pipe(res);
};*/
exports.videoSearch = function(req, res) {
  //var body = '';
  if(req.query.page){
      var x = 
        request('http://api.brightcove.com/services/library?command=search_videos&any=:'
        + req.query.q +'&page_size=20&page_number=' 
        + req.query.page 
        + '&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.'
        , function (error, response, body) {
          var data = JSON.parse(body);
          res.json(201, data);
        });
    }else{
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'
          + req.query.q 
          +'&page_size=20&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.'
          , function (error, response, body) {
          var data = JSON.parse(body);
          res.json(201, data);
        });
    }
};

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
    return auth;
  });
  var x = request({
    method: 'GET',
    url: 'https://cms.api.brightcove.com/v1/accounts/981571817/videos/' + req.query.id +'/references',
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