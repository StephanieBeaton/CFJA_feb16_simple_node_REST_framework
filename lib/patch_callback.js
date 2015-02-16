
// function patchCallback(req, res) {

'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside patchCallback() in patch_callback.js");

  //====================================
  // /resource/:id  PATCH ----> update
  //                 only the specified fields of the entity
  //
  // superagent localhost:3000/monkeys/2 PATCH '{"id": 2, "name": "lucy"}'
  //
  //
  //====================================
  var input = '';

  req.on('data', function(data) {
    input += data.toString('utf-8');
  });

  req.on('end', function() {

    var pathname = url.parse(req.url).pathname;
    var dirs = pathname.split("/");

    var parsed = JSON.parse(input);
    parsed.id = dirs[2];

    console.log("about to call fs.readFileSync");
    var actualPath = './' + dirs[1] + '/' + dirs[2] + '.json';
    console.log("actualPath");
    console.log(actualPath);

    var data;
    var data = fs.readFileSync(actualPath);
    var notes2BUpdt = JSON.parse(data.toString('utf8'));

    for (var key in parsed) {
        notes2BUpdt[key] = parsed[key];
    }

    console.log("about to call fs.writeFileSync");
    console.log(actualPath);
    fs.writeFileSync(actualPath,JSON.stringify(notes2BUpdt));
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify(notes2BUpdt));
    //console.dir(res);
    res.end();
  });

}
