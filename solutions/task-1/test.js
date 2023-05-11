const assert = require('assert');
const reverse = require('../reverse-integer').reverse;

describe('#reverse()', function () {

  it('should return reversed number when number is positive', function () {
    assert.equal(reverse(12345), 54321);
  });

  it('should return reversed number with \'-\' sign when number is negative', function () {
    assert.equal(reverse(-12345), -54321);
  });

  it('should return reversed number without zero at beginning when number ends with 0', function () {
    assert.equal(reverse(45280), 8254);
  });

  it('should return 0 when the value is greater than Int32 maxvalue', function () {
    assert.equal(reverse(9999999999999), 0);
  });

  it('should return 0 when the value is less than Int32 minvalue', function () {
    assert.equal(reverse(-9999999999999), 0);
  });
  
});
