/* add_resources.js  */

'use strict';

var fs = require('fs');

module.exports = function(path, httpVerb, callback, routes) {

  var actualPath = path;

  if (path.charAt(0) == "/"){
     actualPath = path.slice(1);
  }

  var routesIndex = actualPath + '|' + httpVerb;
  console.log("inside _addResources(path, callback, routes);");

  console.log("routesIndex");
  console.log(routesIndex);

  console.log("routes[routesIndex] = ");
  console.dir(routes[routesIndex]);

  //routes[actualPath] = true;
  routes[routesIndex] = callback;

  console.log("routesIndex");
  console.log(routesIndex);
  console.log("routes[routesIndex] = ");
  console.log(routes[routesIndex]);

  // check whether directory exists before creating director
  fs.mkdir('./' + actualPath, function (err) {
    console.log('./' + actualPath + ' directory already exists');
  });
}
