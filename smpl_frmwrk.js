/* simpl_frmwrk.js */

'use strict';

var _listen = require('./lib/smpl_frmwrk_listen');
var _addResources = require('./lib/add_resources');

var routes = {
  "notes|POST": function (req, res) {
    //console.dir(res);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
  }
};

function smplFrmwrk() {

  this.listen = function (port, callback) {
    console.log("inside smplFrmwrk.listen");
     return _listen(port, callback, routes);
  };

  this.addResource = function (path, httpVerb, callback){
    console.log("inside smplFrmwrk.addResource");
    _addResources(path, httpVerb, callback, routes);
  };

}

module.exports = function() {

  return new smplFrmwrk();

}
