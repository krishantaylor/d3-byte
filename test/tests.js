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
      assert.deepEqual(s.ticks(4), [0, 0.25, 0.5, 0.75, 1]);
      assert.deepEqual(s.ticks(8), [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]);
      s = d3.byte.scale().domain([1, 0]);
      assert.deepEqual(s.ticks(1), [0, 1]);
      assert.deepEqual(s.ticks(2), [0, 0.5, 1]);
      assert.deepEqual(s.ticks(4), [0, 0.25, 0.5, 0.75, 1]);
      assert.deepEqual(s.ticks(8), [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]);
      s = d3.byte.scale().domain([0, 1024]);
      assert.deepEqual(s.ticks(1), [0, 1024]);
      assert.deepEqual(s.ticks(2), [0, 512, 1024]);
      assert.deepEqual(s.ticks(4), [0, 256, 512, 768, 1024]);
      assert.deepEqual(s.ticks(8), [0, 128, 256, 384, 512, 640, 768, 896, 1024]);
    });

    it('formats ticks with the appropriate precision', function () {
      var s = d3.byte.scale();
      assert.strictEqual(s.tickFormat(1, false)(s.ticks(1)[0]), '0');
      assert.strictEqual(s.tickFormat(2, false)(s.ticks(2)[0]), '0.0');
      assert.strictEqual(s.tickFormat(4, false)(s.ticks(4)[0]), '0.00');
      assert.strictEqual(s.tickFormat(8, false)(s.ticks(8)[0]), '0.000');
    });
  });

  describe('#tickFormat()', function () {
    it('defaults to automatic units with labels', function () {
      var s;
      s = d3.byte.scale();
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8)), ['0.000B', '0.125B', '0.250B', '0.375B', '0.500B', '0.625B', '0.750B', '0.875B', '1.000B']);
      s = d3.byte.scale().domain([0, 1023]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8)), ['0B', '128B', '256B', '384B', '512B', '640B', '768B', '896B']);
      s = d3.byte.scale().domain([0, 1024]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8)), ['0.000KB', '0.125KB', '0.250KB', '0.375KB', '0.500KB', '0.625KB', '0.750KB', '0.875KB', '1.000KB']);
      s = d3.byte.scale().domain([0, Math.pow(1024, 2)]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8)), ['0.000MB', '0.125MB', '0.250MB', '0.375MB', '0.500MB', '0.625MB', '0.750MB', '0.875MB', '1.000MB']);
    });

    it('can render in automatic units without labels', function () {
      var s;
      s = d3.byte.scale();
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, false)), ['0.000', '0.125', '0.250', '0.375', '0.500', '0.625', '0.750', '0.875', '1.000']);
      s = d3.byte.scale().domain([0, 1023]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, false)), ['0', '128', '256', '384', '512', '640', '768', '896']);
      s = d3.byte.scale().domain([0, 1024]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, false)), ['0.000', '0.125', '0.250', '0.375', '0.500', '0.625', '0.750', '0.875', '1.000']);
      s = d3.byte.scale().domain([0, Math.pow(1024, 2)]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, false)), ['0.000', '0.125', '0.250', '0.375', '0.500', '0.625', '0.750', '0.875', '1.000']);
    });

    it('can render in specific units with labels', function () {
      var s = d3.byte.scale().domain([0, Math.pow(1024, 2) - 1]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8)), ['0KB', '128KB', '256KB', '384KB', '512KB', '640KB', '768KB', '896KB']);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, 'B')), ['0B', '131,072B', '262,144B', '393,216B', '524,288B', '655,360B', '786,432B', '917,504B']);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, 'KB')), ['0KB', '128KB', '256KB', '384KB', '512KB', '640KB', '768KB', '896KB']);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, 'MB')), ['0.000MB', '0.125MB', '0.250MB', '0.375MB', '0.500MB', '0.625MB', '0.750MB', '0.875MB']);
    });

    it('can render in specific units without labels', function () {
      var s = d3.byte.scale().domain([0, Math.pow(1024, 2) - 1]);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, false)), ['0', '128', '256', '384', '512', '640', '768', '896']);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, 'B', false)), ['0', '131,072', '262,144', '393,216', '524,288', '655,360', '786,432', '917,504']);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, 'KB', false)), ['0', '128', '256', '384', '512', '640', '768', '896']);
      assert.deepEqual(s.ticks(8).map(s.tickFormat(8, 'MB', false)), ['0.000', '0.125', '0.250', '0.375', '0.500', '0.625', '0.750', '0.875']);
    });
  });

  describe('#copy()', function () {});
});
