'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside put_callback.js   putCallback()");

  //====================================
  // /resource/:id  PUT ----> replace resource
  //
  // superagent localhost:3000/monkeys/2 PUT '{"id": 2, "name": "geraldine", "sparkles" : "000"}'
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

    // If file does not already exist
    // ... return error
    console.log("about to call fs.writeFileSync");
    console.log('./' + dirs[1] + '/' + dirs[2] + '.json');

    fs.writeFileSync('./' + dirs[1] + '/' + dirs[2] + '.json',
                     JSON.stringify(parsed));
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify(parsed));
    //console.dir(res);
    res.end();
  });
}
