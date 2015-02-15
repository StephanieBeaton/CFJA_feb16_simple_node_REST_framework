
'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple delete request', function() {
  it('responds to a delete request', function(done) {

    var expected_results = "deleted ./data/5.json"

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/5')
      .send({"id": 5, "name": "allison", "sparkles" : "777"})
      .end(function(err, res) {
         chai.request('localhost:3000')
            .del('/notes/5')
            .end(function(err, res) {

              var expected_results = "ENOENT";
              var result = "";

              fs.open('./notes/5.json', 'r', function (err2, fd){
                console.log("result in DELETE in notes_test.js");
                console.dir(err2);
                expect(err2.code).to.eql(expected_results);
              });

              expect(err).to.eql(null);
              done();
            });
      });

  });
});
