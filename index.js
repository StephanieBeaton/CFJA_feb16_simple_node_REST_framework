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

var smplFrmwrk = require('./smpl_frmwrk.js');

var app = smplFrmwrk();  // constructor

//app.addResource("monkeys");

var server = app.listen(3000, function () {
  console.log("inside callback function of app.listen");
});

if (server) {
  console.log("server created in index.js");
};

//console.dir(server);
