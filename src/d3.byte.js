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

    scale.ticks = function(m) {
      return d3_byte_scale_ticks(scale.domain(), m);
    };

    scale.tickFormat = function(n, format) {
      return d3_byte_scale_tickFormat(scale.domain(), n, format);
    };

    scale.copy = function() {
      return d3_byte_scale(linear.copy());
    };

    d3.rebind(scale, linear, 'invert', 'domain', 'range', 'rangeRound', 'interpolate', 'clamp', 'nice');

    return scale;
  }

  function d3_byte_scale_ticks(domain, m) {
    return d3.range.apply(d3, d3_byte_scale_tickRange(domain, m));
  }

  function d3_byte_scale_tickRange(domain, m) {
    if (m == null) {
      m = 8;
    }

    var extent = d3.extent(domain),
      span = extent[1] - extent[0],
      step = Math.pow(2, Math.floor(Math.log(span / m) / Math.LN2)),
      err = m / span * step;

    if (err <= 0.3) {
      step *= 8;
    } else if (err <= 0.6) {
      step *= 4;
    } else if (err <= 0.9) {
      step *= 2;
    }

    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * 0.5;
    extent[2] = step;

    return extent;
  }

  function d3_byte_scale_tickFormat(domain, n, format) {
    var range, level, base, precision;

    range = d3_byte_scale_tickRange(domain, n);

    if ((level = d3_byte_scale_formatSignificant.indexOf(format)) === -1) {
      level = Math.floor(Math.log(range[1]) / Math.LN2 / 10 + 0.001);
      format = format === false ? '' : d3_byte_scale_formatSignificant[level];
    }

    base = Math.pow(1024, level);
    precision = -Math.floor(Math.log(range[2] / base) / Math.LN2 + 0.001);

    return function(value) {
      return d3.format(',.' + precision + 'f')(value / base) + format;
    };
  }

  var d3_byte_scale_formatSignificant = ['B', 'KB', 'MB', 'GB', 'TB'];
})(d3);
