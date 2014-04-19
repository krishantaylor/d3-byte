;(function (d3) {
  'use strict';

  d3.byte = {};

  d3.byte.scale = function () {
    return d3_byte_scale(d3.scale.linear());
  };

  function d3_byte_scale(linear) {
    function scale(x) {
      return linear(x);
    }

    scale.copy = function() {
      return d3_byte_scale(linear.copy());
    };

    d3.rebind(scale, linear, 'invert', 'domain', 'range', 'rangeRound', 'interpolate', 'clamp', 'nice', 'ticks', 'tickFormat');

    return scale;
  }
})(d3);
