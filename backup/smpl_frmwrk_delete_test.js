
'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../index');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple delete request', function() {

  beforeEach(function() {

    var fs = require('fs');

    //console.log(__dirname);

    var files = fs.readdirSync('./monkeys');
    for (var i = 0; i < files.length; i++) {
      console.log('./monkeys/' + files[i]);
      fs.unlinkSync('./monkeys/' + files[i]);
    }

    console.log('successfully deleted ./monkey/*');

    var data_before_delete = {
      "name": "tom",
      "sparkles": "456",
      "id": "1"
    };

    var actualPath = './monkeys/1.json';
    fs.writeFileSync(actualPath,
                     JSON.stringify(data_before_delete));
  });

  it('responds to a delete request', function(done) {

    var expected_results = "deleted ./data/5.json"

    console.dir(expected_results);

    chai.request('localhost:3000')
      .del('/monkeys/1')
      .end(function(err, res) {

        var expected_results = "ENOENT";
        var result = "";

        fs.open('./monkeys/1.json', 'r', function (err2, fd){
          console.log("result in DELETE in smpl_frmwrk_delete_test.js");
          console.dir(err2);
          expect(err2.code).to.eql(expected_results);
        });

        expect(err).to.eql(null);
        done();
    });  // chai.request

  });  //it('responds to ....
});
