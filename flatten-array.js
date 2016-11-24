function flatten (ary) {
  var ret = []
  for (var i = 0; i < ary.length; i++) {
    if (Array.isArray(ary[i])) {
      ret = ret.concat(flatten(ary[i]))
    } else {
      ret.push(ary[i])
    }
  }
  return ret
}

Array.prototype.flatten = function () {
  var ret = []
  for (var i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) {
      ret = ret.concat(this[i].flatten())
    } else {
      ret.push(this[i])
    }
  }
  return ret
}

function flattenReduce (ary) {
  return ary.reduce(function (a, b) {
    if (Array.isArray(b)) {
      return a.concat(flattenReduce(b))
    }
    return a.concat(b)
  }, [])
}
