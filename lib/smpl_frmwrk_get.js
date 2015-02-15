'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside smpl_frmwrk_get.js   smplFrmwrkGet");

  var pathname = url.parse(req.url).pathname;
  var dirs = pathname.split("/");

  console.log("dirs = " + dirs);
  console.log("routes[dirs[2]] = " + routes[dirs[2]]);

  if (!routes[dirs[1]]) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found in smpl_frmwrk_get.js    smplFrmwrkGet'}));
    res.end();
  } else {

    //====================================
    // /resource GET ----> id
    //
    // superagent localhost:3000/notes/2 GET
    //
    //====================================

    var data;
    console.log("pathname = " + pathname, __dirname);

    console.log("about to call fs.readFileSync");
    console.log('./' + dirs[1] + '/' + dirs[2] + '.json');

    var data = fs.readFileSync('./' + dirs[1] + '/' + dirs[2] + '.json');
    var notesFromDB = JSON.parse(data.toString('utf8'));

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    //res.write(JSON.stringify({unicorn: "I'm a happy unicorn! Hooray!"}));
    res.write(JSON.stringify(notesFromDB));

    res.end();

  }
}
