/* simpl_frmwrk_listen.js */
'use strict';

var http = require('http');
var smplFrmwrkGet  = require('./smpl_frmwrk_get.js');
var smplFrmwrkPost = require('./smpl_frmwrk_post.js');
var smplFrmwrkPut  = require('./smpl_frmwrk_put.js');
var smplFrmwrkPatch  = require('./smpl_frmwrk_patch.js');
var smplFrmwrkDelete = require('./smpl_frmwrk_delete.js');

//var _post   = require('./lib/smpl_frmwrk_post');

var verbs = {
  "GET":    smplFrmwrkGet,
  "POST":   smplFrmwrkPost,
  "PUT":    smplFrmwrkPut,
  "PATCH":  smplFrmwrkPatch,
  "DELETE": smplFrmwrkDelete
};


module.exports = function(port, callback, routes) {

  console.log("inside listen in smpl_frmwrk_listen.js")
  console.log("port = " + port);

  var server = http.createServer(function(req, res) {
    console.log("req.method = " + req.method);

    if (typeof(verbs[req.method]) === "function") {
      verbs[req.method](req, res, routes);
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify({msg: 'page not found in smpl_frmwrk.js  http.createServer callback'}));
      res.end();
    }
  });

  console.log("declared var server");

  console.log("calling server.listen(port, callback)");

  server.listen(port, callback);

  return server;

}
