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

  describe('#ticks()', function () {
    it('generates ticks of varying degree', function () {
      var s;
      s = d3.byte.scale();
      assert.deepEqual(s.ticks(1), [0, 1]);
      assert.deepEqual(s.ticks(2), [0, 0.5, 1]);
      assert.deepEqual(s.ticks(5), [0, 0.25, 0.5, 0.75, 1]);
      assert.deepEqual(s.ticks(10), [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]);
      s = d3.byte.scale().domain([1, 0]);
      assert.deepEqual(s.ticks(1), [0, 1]);
      assert.deepEqual(s.ticks(2), [0, 0.5, 1]);
      assert.deepEqual(s.ticks(5), [0, 0.25, 0.5, 0.75, 1]);
      assert.deepEqual(s.ticks(10), [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]);
      s = d3.byte.scale().domain([0, 1024]);
      assert.deepEqual(s.ticks(1), [0, 1024]);
      assert.deepEqual(s.ticks(2), [0, 512, 1024]);
      assert.deepEqual(s.ticks(5), [0, 256, 512, 768, 1024]);
      assert.deepEqual(s.ticks(10), [0, 128, 256, 384, 512, 640, 768, 896, 1024]);
    });

    it('formats ticks with the appropriate precision', function () {
      var s = d3.byte.scale();
      assert.strictEqual(s.tickFormat(1, false)(s.ticks(1)[0]), '0');
      assert.strictEqual(s.tickFormat(2, false)(s.ticks(2)[0]), '0.0');
      assert.strictEqual(s.tickFormat(5, false)(s.ticks(5)[0]), '0.00');
      assert.strictEqual(s.tickFormat(10, false)(s.ticks(10)[0]), '0.000');
    });
  });

  describe('#tickFormat()', function () {});

  describe('#copy()', function () {});
});
