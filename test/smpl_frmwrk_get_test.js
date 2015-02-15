'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple get request', function() {
  it('responds to a get request', function(done) {

    var expected_results = {
      "id": "6",
      "name": "tom",
      "sparkles": "456"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/6')
      .send({"id": 6, "name": "tom", "sparkles" : "456"})
      .end(function(err, res) {

        chai.request('localhost:3000')
          .get('/notes/6')
          .end(function(err, res) {
            console.dir(res.body);
            console.log("about to call expect()");
            expect(err).to.eql(null);
            expect(res.body).to.eql(expected_results);
            done();
        });

      });

  });
});
