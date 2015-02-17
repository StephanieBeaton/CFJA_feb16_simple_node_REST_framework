
// function getCallback(req, res) {

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');


module.exports = function (req, res) {
  console.log("inside getCallback() in get_callback.js");

  var pathname = url.parse(req.url).pathname;
  var dirs = pathname.split("/");

  //====================================
  // /resource GET ----> id
  //
  // superagent localhost:3000/notes/2 GET
  //
  //====================================

  var actualPath = './' + dirs[1] + '/' + dirs[2] + '.json';

  console.log("about to call fs.readFileSync");
  console.log(actualPath);

  var data = fs.readFileSync(actualPath);
  var notesFromDB = JSON.parse(data.toString('utf8'));

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  //res.write(JSON.stringify({unicorn: "I'm a happy unicorn! Hooray!"}));
  res.write(JSON.stringify(notesFromDB));

  res.end();
};
//======================================================
