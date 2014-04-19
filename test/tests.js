/*global describe:false, it:false, assert:true*/
describe('d3.byte.scale', function () {
  describe('scale()', function () {});

  describe('#invert()', function () {});

  describe('#domain()', function () {
    it('defaults to [0,1]', function () {
      var s = d3.byte.scale();
      assert.deepEqual(s.domain(), [0, 1]);
    });
  });

  describe('#range()', function () {
    it('defaults to [0,1]', function () {
      var s = d3.byte.scale();
      assert.deepEqual(s.range(), [0, 1]);
    });
  });

  describe('#rangeRound()', function () {});

  describe('#interpolate()', function () {});

  describe('#clamp()', function () {});

  describe('#nice()', function () {});

  describe('#ticks()', function () {});

  describe('#tickFormat()', function () {});

  describe('#copy()', function () {});
});
