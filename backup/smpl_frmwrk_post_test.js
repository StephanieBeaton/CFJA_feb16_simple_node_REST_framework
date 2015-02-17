'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple post request', function() {
  it('responds to a post request', function(done) {

    var expected_results = {
      "name": "george",
      "sparkles": "125",
      "id": 2,
      "msg": "this was added on the server",
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/monkeys')
      .send({"name": "george", "sparkles" : "125"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});
