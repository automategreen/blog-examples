var Insteon = require('home-controller').Insteon;
var hub = new Insteon();
var route = require('koa-route');
var koa = require('koa');
var app = koa();

app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    console.log('Error:', err.message);
    this.status = err.status || 500;
    this.body = err.message;
  }
});

app.use(route.get('/light/:id/on', turnOn));
app.use(route.get('/light/:id/off', turnOff));

app.use(route.get('/thermostat/:id/up', tempUp));
app.use(route.get('/thermostat/:id/down', tempDown));


function *turnOn(id) {
  var status = yield hub.light(id).turnOn();
  if(status.response) {
    this.body = 'on';
  }
}

function *turnOff(id) {
  var status = yield hub.light(id).turnOff();
  if(status.response) {
    this.body='off';
  }
}

function *tempUp(id) {
  var therm = hub.thermostat(id);
  var status = yield therm.tempUp();
  if(status.response) {
    this.body = yield therm.temp();
  }
}

function *tempDown(id) {
  var therm = hub.thermostat(id);
  var status = yield therm.tempDown();
  if(status.response) {
    this.body = yield therm.temp();
  }
}

hub.connect(process.env.HUB_IP, function () {
  app.listen(3000);
});
