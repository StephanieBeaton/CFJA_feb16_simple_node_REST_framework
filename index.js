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
