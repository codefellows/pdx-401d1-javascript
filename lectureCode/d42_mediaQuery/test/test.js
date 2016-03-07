var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var app_js = require('../js/app.js');

describe('Array', function() {
  describe('#indexOf()', function() {

    it('Should return -1 when the test value isn\'t present in the array',
      function() {
        assert.equal(-1, app_js.a.indexOf(56));
        assert.equal(-1, app_js.a.indexOf(0));
    }); // it

    it('Should return index when the test value is present in the array',
      function() {
        assert.equal(0, app_js.a.indexOf(1));
        assert.equal(2, app_js.a.indexOf(3));
    }); // it

    it('Values should be equal.',
      function() {
        chai.should();
        app_js.x.should.be.a('number');
        expect(app_js.x+1).to.equal(app_js.foo() + 1);
    }); // it

    it('Name should appear.',
      function() {
        var n = 'Sabrina';
        expect(app_js.greet(n)).to.equal('Hi, Sabrina!');
    });

  }); // describe #indexOf()
}); // describe Array
