/* add_resources.js  */

'use strict';

var fs = require('fs');

module.exports = function(path, routes) {

  var actualPath = path;

  if (path.charAt(0) == "/"){
     actualPath = path.slice(1);
  }

  console.log("inside update_routes");

  routes[actualPath] = true;

  console.log("routes[actualPath] = ");
  console.dir(routes[actualPath]);

  fs.mkdirSync('./' + actualPath);
}
