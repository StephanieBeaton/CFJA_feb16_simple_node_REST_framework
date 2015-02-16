/* smpl_frmwrk_post.js */
'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside smpl_frmwrk_generic_action.js   smplFrmwrkGenericAction");

  var pathname = url.parse(req.url).pathname;
  var dirs = pathname.split("/");

  var routesIndex = dirs[1] + '|' + req.method;
  console.log("routesIndex");
  console.log(routesIndex);
  console.log("dirs = " + dirs);
  console.log("routes[routesIndex] = " + routes[routesIndex]);

  if (!routes[routesIndex]) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found ' + dirs[1] + 'in smpl_frmwrk_post.js    smplFrmwrkPost'}));
    res.end();
  } else {

    console.log("routes[routesIndex]");

    if (typeof routes[routesIndex] === "function") {
      routes[routesIndex](req,res);
    }

  } // if(){}else{}

} // function () {}
