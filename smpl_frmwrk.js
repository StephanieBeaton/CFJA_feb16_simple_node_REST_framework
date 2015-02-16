/* simpl_frmwrk.js */

'use strict';

var _listen = require('./lib/smpl_frmwrk_listen');
var _addResources = require('./lib/add_resources');

var routes = {
  "notes": true
};

function smplFrmwrk() {

  this.listen = function (port, callback) {
    console.log("inside smplFrmwrk.listen");
     return _listen(port, callback, routes);
  };

  this.addResource = function (path){
    console.log("inside smplFrmwrk.addResource");
    _addResources(path, routes);
  };

}

module.exports = function() {

  return new smplFrmwrk();

}
