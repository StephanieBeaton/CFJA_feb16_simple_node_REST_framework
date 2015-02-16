//======================================================

// function postCallback(req, res)

var fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');

module.exports = function (req, res) {

  console.log("inside postCallback() in post_callback.js");

  var input = '';

  req.on('data', function(data) {
    input += data.toString('utf-8');
  });

  req.on('end', function() {

    var pathname = url.parse(req.url).pathname;
    var dirs = pathname.split("/");

    var parsed = JSON.parse(input);

    // read directory and find max existing file number

    console.log("directory path");
    console.log('./' + dirs[1]);

    //var files = fs.readdirSync('./' + dirs[1]);
    fs.readdir('./' + dirs[1], function (err, files) {
      console.log("files");
      console.log(files);
      console.log("err");
      console.log(err);

      var nextNbr = 1;
      if (files.length === 0) {
        parsed["id"] = 1;
        nextNbr = 1;
      } else {
        console.log("files array =");
        console.log(files);
        files.sort(function(a, b){return a-b});
        var file = files[files.length - 1];
        var nextNbr = Number(file.charAt(0));
        nextNbr += 1;
        parsed["id"] = nextNbr;
      }
      var actualPath = './' + dirs[1] + '/' + nextNbr + '.json';
      console.log("about to call fs.open");
      console.log(actualPath);

      fs.open(actualPath, 'r', function (err2, fd){
        console.log("attempted to open file in POST in notes_route.js");
        console.log("before console.log(err2)");
        console.log(err2);
        console.log("after console.log(err2)");

        if (err2) {
          // resource does not exist, create the file
          console.log("about to fs.writeFileSync()");
          console.log("actualPath");
          console.log(actualPath);
          fs.writeFileSync(actualPath,
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
        }  // if (err2)

      });  // fs.open()
    });  // fs.readdir()
  }); // req.on()
}

//======================================================
