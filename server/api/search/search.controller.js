'use strict';

var _ = require('lodash');
var http = require('http');
var Search = require('./search.model');
var request = require('request');
var client_id = "77d2c6a5-fe93-4f60-a1f5-9cef18295615";
var client_secret = "_dJuEnJtAAXTSUda_ahscYAPpT9uNemZoIZZQe0rMUY5zRwyZj4iVkAR_jbzx5s3DRFcS8rAqfddPO96tAFfSA";
var auth_string = new Buffer(client_id + ":" + client_secret).toString('base64');
var auth = {};
console.log(auth_string);
var y = request({
  method: 'POST',
  url: 'https://oauth.brightcove.com/v3/access_token',
  headers: {
    'Authorization': 'Basic ' + auth_string,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'grant_type=client_credentials'
}, function (error, response, body) {
  console.log('Status: ', response.statusCode);
  console.log('Headers: ', JSON.stringify(response.headers));
  console.log('Response: ', body);
  console.log('Error: ', error);
  var str = JSON.parse(body);
  auth = str.access_token;
  return auth;
});



// 
exports.search = function(req, res) {
  /*var body = '';*/
  /*if(req.query.page){
    console.log(req.query);
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'+ req.query.q +'&page_size=20&page_number=' + req.query.page + '&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.');
    }else{
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'+ req.query.q +'&page_size=20&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.');
    }*/
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
  
};
exports.videoSearch = function(req, res) {
  /*var body = '';*/
  /*if(req.query.page){
    console.log(req.query);
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'+ req.query.q +'&page_size=20&page_number=' + req.query.page + '&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.');
    }else{
      var x = request('http://api.brightcove.com/services/library?command=search_videos&any=:'+ req.query.q +'&page_size=20&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.');
    }*/
  var z = request({
    method: 'GET',
    url: 'https://cms.api.brightcove.com/v1/accounts/981571817/videos?50updated_attags:foo+updated_at:2014-06-01..',
    headers: {
      'Authorization': 'Bearer ' + auth,
      'Content-Type': 'application/json'
    },
    body: "{}"
  }, function (error, response, body) {
    console.log(response);
    var str = JSON.parse(body);
    res.json(201, str);
  });
  
};
exports.playlistSearch = function(req, res) {
  var body = '';
  console.time(request);
    var x = request('http://api.brightcove.com/services/library?command=find_all_playlists&page_number=1&playlist_fields=name,id&sort_by=publish_date&sort_order=ASC&get_item_count=true&token=6nww9zJn-DqFjGT1nByWrCcBDu36nR4Ws1pu7In8Dpk.');
   console.timeEnd(request);
  req.pipe(x)
  x.pipe(res);
};


function handleError(res, err) {
  return res.send(500, err);
}