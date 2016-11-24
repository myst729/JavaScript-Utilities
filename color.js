/* JavaScript Color Conversion */

function HSV (h, s, v) {
  this.h = Math.min(Math.max(h, 0), 360)
  this.s = Math.min(Math.max(s, 0), 100)
  this.v = Math.min(Math.max(v, 0), 100)
}

function RGB (r, g, b) {
  this.r = Math.min(Math.max(r, 0), 255)
  this.g = Math.min(Math.max(g, 0), 255)
  this.b = Math.min(Math.max(b, 0), 255)
}

function CMYK (c, m, y, k) {
  this.c = Math.min(Math.max(c, 0), 100)
  this.m = Math.min(Math.max(m, 0), 100)
  this.y = Math.min(Math.max(y, 0), 100)
  this.k = Math.min(Math.max(k, 0), 100)
}

var ColorConverter = {
  _RGBtoHSV: function (rgb) {
    var hsv = new HSV(0, 0, 0)

    var r = rgb.r / 255
    var g = rgb.g / 255
    var b = rgb.b / 255

    var minVal = Math.min(r, g, b)
    var maxVal = Math.max(r, g, b)
    var delta = maxVal - minVal

    hsv.v = maxVal

    if (delta === 0) {
      hsv.h = 0
      hsv.s = 0
    } else {
      hsv.s = delta / maxVal
      var delR = (((maxVal - r) / 6) + (delta / 2)) / delta
      var delG = (((maxVal - g) / 6) + (delta / 2)) / delta
      var delB = (((maxVal - b) / 6) + (delta / 2)) / delta

      if (r === maxVal) {
        hsv.h = delB - delG
      } else if (g === maxVal) {
        hsv.h = (1 / 3) + delR - delB
      } else if (b === maxVal) {
        hsv.h = (2 / 3) + delG - delR
      }

      if (hsv.h < 0) {
        hsv.h += 1
      }
      if (hsv.h > 1) {
        hsv.h -= 1
      }
    }

    hsv.h = Math.round(hsv.h * 360)
    hsv.s = Math.round(hsv.s * 100)
    hsv.v = Math.round(hsv.v * 100)

    return hsv
  },

  _HSVtoRGB: function (hsv) {
    var rgb = new RGB(0, 0, 0)

    var h = hsv.h / 360
    var s = hsv.s / 100
    var v = hsv.v / 100

    if (s === 0) {
      rgb.r = v * 255
      rgb.g = v * 255
      rgb.v = v * 255
    } else {
      varH = h * 6
      varI = Math.floor(varH)
      var1 = v * (1 - s)
      var2 = v * (1 - s * (varH - varI))
      var3 = v * (1 - s * (1 - (varH - varI)))

      if (varI === 0) {
        rgb.r = v
        rgb.g = var3
        rgb.b = var1
      } else if (varI === 1) {
        rgb.r = var2
        rgb.g = v
        rgb.b = var1
      } else if (varI === 2) {
        rgb.r = var1
        rgb.g = v
        rgb.b = var3
      } else if (varI === 3) {
        rgb.r = var1
        rgb.g = var2
        rgb.b = v
      } else if (varI === 4) {
        rgb.r = var3
        rgb.g = var1
        rgb.b = v
      } else {
        rgb.r = v
        rgb.g = var1
        rgb.b = var2
      }

      rgb.r = Math.round(rgb.r * 255)
      rgb.g = Math.round(rgb.g * 255)
      rgb.b = Math.round(rgb.b * 255)
    }

    return rgb
  },

  _CMYKtoRGB: function (cmyk) {
    var rgb = new RGB(0, 0, 0)

    var c = cmyk.c / 100
    var m = cmyk.m / 100
    var y = cmyk.y / 100
    var k = cmyk.k / 100

    rgb.r = 1 - Math.min(1, c * (1 - k) + k)
    rgb.g = 1 - Math.min(1, m * (1 - k) + k)
    rgb.b = 1 - Math.min(1, y * (1 - k) + k)

    rgb.r = Math.round(rgb.r * 255)
    rgb.g = Math.round(rgb.g * 255)
    rgb.b = Math.round(rgb.b * 255)

    return rgb
  },

  _RGBtoCMYK: function (rgb) {
    var cmyk = new CMYK(0, 0, 0, 0)

    r = rgb.r / 255;
    g = rgb.g / 255;
    b = rgb.b / 255;

    cmyk.k = Math.min(1 - r, 1 - g, 1 - b)
    cmyk.c = (1 - r - cmyk.k) / (1 - cmyk.k)
    cmyk.m = (1 - g - cmyk.k) / (1 - cmyk.k)
    cmyk.y = (1 - b - cmyk.k) / (1 - cmyk.k)

    cmyk.c = Math.round(cmyk.c * 100)
    cmyk.m = Math.round(cmyk.m * 100)
    cmyk.y = Math.round(cmyk.y * 100)
    cmyk.k = Math.round(cmyk.k * 100)

    return cmyk
  },

  toRGB: function (o) {
    if (o instanceof RGB) {
      return o
    }
    if (o instanceof HSV) {
      return this._HSVtoRGB(o)
    }
    if (o instanceof CMYK) {
      return this._CMYKtoRGB(o)
    }
  },

  toHSV: function (o) {
    if (o instanceof HSV) {
      return o
    }
    if (o instanceof RGB) {
      return this._RGBtoHSV(o)
    }
    if (o instanceof CMYK) {
      return this._RGBtoHSV(this._CMYKtoRGB(o))
    }
  },

  toCMYK: function (o) {
    if (o instanceof CMYK) {
      return o
    }
    if (o instanceof RGB) {
      return this._RGBtoCMYK(o)
    }
    if (o instanceof HSV) {
      return this._RGBtoCMYK(this._HSVtoRGB(o))
    }
  }
}
