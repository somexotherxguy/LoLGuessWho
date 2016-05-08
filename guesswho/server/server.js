//server.js

var express = require('express');
var app = express();
var request = require('request');

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var sumId; 
    var sumName = req.query.summonername;
    var idUrl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + sumName + '?api_key=';
    request(idUrl, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(data);
        sumId = data[sumName]["id"];
        var masteryUrl = "https://na.api.pvp.net/championmastery/location/na1/player/" + sumId + "/topchampions?api_key=";

        request(masteryUrl, function (error, response, masterydata) {
            if (!error && response.statusCode == 200) {
                masterydata = JSON.parse(masterydata);
                res.send(masterydata);
            }
        })
      } else {
          res.send(error);
      }
    })
}); 

app.get('/champion/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var champName = req.query.championid;
    var nameUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + champName + "?api_key=";
    request(nameUrl, function (error, response, namedata) {
        if(!error && response.statusCode == 200) {
            namedata = JSON.parse(namedata);
            res.send(namedata);
        }
    })
});

app.listen(8081);