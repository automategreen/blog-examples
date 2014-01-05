#!/usr/bin/env node
'use strict';

var net = require('net');

var host = process.argv[2];
var port = 9761;
if(process.argv.length > 4) {
  port = process.argv[3];
}

var client = new net.Socket();
client.setEncoding('hex');

client.on('connect', function() {
  console.log('Connected to: ' + host + ':' + port);

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (cmd) {
    cmd = cmd.trim();
    if (/^(quit|exit|q)$/i.test(cmd)) {
      client.end();
    } else {
      console.log('Send:', cmd);
      client.write(cmd, 'hex');
    }
  });

});

client.on('data', function(data) {
  console.log('Rsvd:', data);
});

client.on('close', function() {
  console.log('Connection closed');
  process.exit();
});

client.connect(port, host);