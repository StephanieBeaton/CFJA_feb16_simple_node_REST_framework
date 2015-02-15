'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple patch request', function() {
  it('responds to a patch request', function(done) {

    var expected_results = {
      "id": "3",
      "name": "fred",
      "sparkles": "789"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/3')
      .send({"id": 3, "name": "sam", "sparkles" : "789"});

    chai.request('localhost:3000')
      .patch('/notes/3')
      .send({"name": "fred"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});
