'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside smpl_frmwrk_delete.js   smplFrmwrkDelete");

  var pathname = url.parse(req.url).pathname;
  var dirs = pathname.split("/");

  console.log("dirs = " + dirs);
  console.log("routes[dirs[2]] = " + routes[dirs[2]]);

  if (!routes[dirs[1]]) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found in smpl_frmwrk_delete.js    smplFrmwrkDelete'}));
    res.end();
  } else {

    //====================================
    // /resource/:id  DELETE ----> delete
    //
    //  superagent localhost:3000/notes/2 DELETE
    //
    //====================================
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);
    var dirs = pathname.split("/");
    console.log(dirs);

    console.log("about to call fs.unlinkSync");
    console.log('./' + dirs[1] + '/' + dirs[2] + '.json');

    fs.unlinkSync('./' + dirs[1] + '/' + dirs[2] + '.json');

    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    res.write("deleted " + './' + dirs[1] + '/' + dirs[2] + '.json');
    //console.dir(res);
    res.end();
  }
}
