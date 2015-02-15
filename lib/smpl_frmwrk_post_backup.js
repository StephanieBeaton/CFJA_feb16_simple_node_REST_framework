'use strict';

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res, routes) {

  console.log("inside smpl_frmwrk_post.js   smplFrmwrkPost");

  var pathname = url.parse(req.url).pathname;
  var dirs = pathname.split("/");

  console.log("dirs = " + dirs);
  console.log("routes[dirs[1]] = " + routes[dirs[1]]);

  if (!routes[dirs[1]]) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify({msg: 'page not found in smpl_frmwrk_post.js    smplFrmwrkPost'}));
    res.end();
  } else {
    //====================================
    // /resource POST ----> create resource
    //  if a resource already exists in POST throw an error
    //
    // superagent localhost:3000/notes/2 POST '{"id": 2, "name": "george", "sparkles" : "125"}'
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

      /*
      // without check that file exists

      fs.writeFileSync('./data/notes' + dirs[2] + '.json',
                       JSON.stringify(parsed));
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      parsed.msg = "this was added on the server";

      res.write(JSON.stringify(parsed));
      //console.dir(res);
      res.end();
      */

      //  check whether file already exists

     // remove dirs[2] references
      // read directory and find max existing file number
      // augh !!
      var nextNbr = 1;
      fs.readdir(path, function(err, files) {
        files.sort(function(a, b){return a-b});
        nextNbr = files[files.length - 1];
      });

      console.log("about to call fs.open");
      console.log('./' + dirs[1] + '/' + dirs[2] + '.json');

      fs.open('./' + dirs[1] + '/' + dirs[2] + '.json', 'r', function (err2, fd){
        console.log("attempted to open file in POST in notes_route.js");
        console.log("before console.log(err2)");
        console.log(err2);
        console.log("after console.log(err2)");


        if (err2) {
          // resource does not exist, create the file
          fs.writeFileSync('./' + dirs[1] + '/' + nextNbr + '.json',
                           JSON.stringify(parsed));
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });

          parsed.msg = "this was added on the server";

          res.write(JSON.stringify(parsed));
          //console.dir(res);
          res.end();

        } else {
          res.writeHead(404, {
            'Content-Type': 'application/json'
          });

          res.write(JSON.stringify({msg: 'resource already exists'}));
          res.end();
        }

      });

    });
  }
}
