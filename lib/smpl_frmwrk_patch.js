'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside smpl_frmwrk_patch.js   smplFrmwrkPatch");

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
    // /resource/:id  PATCH ----> update
    //                 only the specified fields of the entity
    //
    // superagent localhost:3000/notes/2 PATCH '{"id": 2, "name": "lucy"}'
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
      console.log('./' + dirs[1] + '/' + dirs[2] + '.json');

      var data;
      var data = fs.readFileSync('./data/notes' + dirs[2] + '.json');
      var notes2BUpdt = JSON.parse(data.toString('utf8'));

      for (var key in parsed) {
          notes2BUpdt[key] = parsed[key];
      }

      console.log("about to call fs.writeFileSync");
      console.log('./' + dirs[1] + '/' + dirs[2] + '.json');
      fs.writeFileSync('./' + dirs[1] + '/' + dirs[2] + '.json',
                       JSON.stringify(notes2BUpdt));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(notes2BUpdt));
      //console.dir(res);
      res.end();
    });
  }
}
