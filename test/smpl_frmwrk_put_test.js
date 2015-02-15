'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple put request', function() {
  it('responds to a put request', function(done) {

    var expected_results = {
      "id": "4",
      "name": "george",
      "sparkles": "125"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/4')
      .send({"id": 4, "name": "sam", "sparkles" : "789"});

    chai.request('localhost:3000')
      .put('/notes/4')
      .send({"id": 4, "name": "george", "sparkles" : "125"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});
