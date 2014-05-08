var Insteon = require('home-controller').Insteon;
var hub = new Insteon();
var express = require('express');
var app = express();


app.get('/light/:id/on', function(req, res){
  var id = req.params.id;
  hub.turnOn(id, function (err, status) {
    if(err) {
      res.send(500);
    }
    if(status.response) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});

app.get('/light/:id/off', function(req, res){
  var id = req.params.id;
  hub.turnOff(id, function (err, status) {
    if(err) {
      res.send(500);
    }
    if(status.response) {
      res.send(200);
    } else {
      res.send(404);
    }
  });
});



hub.connect(process.env.HUB_IP, function () {
  app.listen(3000);
});
