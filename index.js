/* =======================================================

Write a simple node REST framework
Due Monday by 11:59pm  Points 20
Submitting a website url
Your framework doesn't have to be production
 but it should be able to do the following:

* Easily handle multiple REST routes

* Start a server

* Parse the request body into json

Feel free to use code from popular frameworks
 just make sure give credit where credit is due.
  The important of this project is to not over think it.
   Your framework doesn't need to accomplish a lot
   but it has to work and
    has to be easier to use than vanilla node.

Rubric

Ease of use: 5pts

Functionality: 5pts

Documentation: 5pts

Tests: 5pts
=============================================================
*/

'use strict';

var postCallback = require('./lib/post_callback'),
    getCallback  = require('./lib/get_callback'),
    putCallback  = require('./lib/put_callback'),
    patchCallback  = require('./lib/patch_callback'),
    deleteCallback  = require('./lib/delete_callback');

var smplFrmwrk = require('./smpl_frmwrk.js');

var app = smplFrmwrk();

/*
app.addResource("monkeys", "POST", function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
});
*/
app.addResource("monkeys", "POST", postCallback);

/*
app.addResource("giraffes", "GET", function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
});
*/

app.addResource("monkeys", "GET", getCallback);

app.addResource("monkeys", "PUT", putCallback);

app.addResource("monkeys", "PATCH", patchCallback);

app.addResource("monkeys", "DELETE", deleteCallback);

var server = app.listen(3000, function () {
  console.log("inside callback function of app.listen");
});

if (server) {
  console.log("server created in index.js");
}


//console.dir(server);
