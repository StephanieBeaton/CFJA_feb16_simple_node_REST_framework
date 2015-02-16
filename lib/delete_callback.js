
// function deleteCallback(req, res) {

'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside deleteCallback() in delete_callback.js");

  //====================================
  // /resource/:id  DELETE ----> delete
  //
  //  superagent localhost:3000/monkeys/2 DELETE
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
