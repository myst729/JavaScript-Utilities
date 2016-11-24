// https://gist.github.com/mazesoul/957713

var Klass = (function () {
  function slice (a) {
    var s = Array.prototype.slice
    return s.apply(a, s.call(arguments, 1)) 
  }

  function create (proto) {
    function F () {}
    F.prototype = proto
    proto.constructor = F
    return new F
  }

  return function Klass (base, proto) {
    // Single param signature
    if (arguments.length === 1) {
      if (typeof base === 'function') {
        proto = {}
      } else {
        proto = base
        base = function () {}
      }
    }

    function Cstr () {
      if ('init' in this) {
        this.init.apply(this, slice(arguments))
      }
    }

    var p = Cstr.prototype = create(base.prototype)

    // Add proto and bind constructor manually
    for (var k in proto) {
      p[k] = proto[k]
    }

    p.constructor = Cstr

    // _super: Awesome meta-magik. Closing over the prototype chain
    p._super = function (method, args) {
      // Catching second run of this._super, meaning this._super was already assigned base.prototype._super.
      // It implies that the method is located at least 2 levels up in the normal prototype chain.
      // Invoking _super through _super effectively recurse up the _super chain. 
      if (base.prototype[method] === this[method]) {
        return this._super.apply(this, ['_super'].concat(slice(arguments)))
      }

      // In case the method in base.prototype calls this._super we need to make it point to base
      this._super = base.prototype._super
      // Invoke the intended method
      var result = base.prototype[method].apply(this, slice(arguments, 1))
      // Resume to normal _super
      delete this._super
      return result
    }
  
    // Add extend to the new constructor to allow Cstr.extend( { protoextra } )
    Cstr.extend = function (proto) {
      return Klass(Cstr, proto)
    }

    return Cstr
  }
})()
