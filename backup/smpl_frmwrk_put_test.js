'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple put request', function() {

  beforeEach(function() {

    var fs = require('fs');

    console.log(__dirname);

    var files = fs.readdirSync('./monkeys');
    for (var i = 0; i < files.length; i++) {
      console.log('./monkeys/' + files[i]);
      fs.unlinkSync('./monkeys/' + files[i]);
    }

    console.log('successfully deleted ./monkey/*');

    var data_before_put = {
      "name": "tom",
      "sparkles": "456",
      "id": "1"
    };

    var actualPath = './monkeys/1.json';
    fs.writeFileSync(actualPath,
                     JSON.stringify(data_before_put));
  });

  it('responds to a put request', function(done) {

    var expected_results = {
      "id": "1",
      "name": "george",
      "sparkles": "125"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .put('/monkeys/1')
      .send({"id": 1, "name": "george", "sparkles" : "125"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});
