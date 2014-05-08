var Insteon = require('home-controller').Insteon;
var hub = new Insteon();
var route = require('koa-route');
var koa = require('koa');
var app = koa();

app.use(route.get('/light/:id/on', turnOn));
app.use(route.get('/light/:id/off', turnOff));


function *turnOn(id) {
  var status = yield hub.light(id).turnOn();
  if(!status.response) {
    this.throw(404);
  }
  this.status = 200;
}

function *turnOff(id) {
  var status = yield hub.light(id).turnOff();
  console.log('%j', status);
  if(!status.response) {
    this.throw(404);
  }
  this.status = 200;
}

hub.connect(process.env.HUB_IP, function () {
  app.listen(3000);
});
