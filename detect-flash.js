function detectFlash() {
  if(window.ActiveXObject) {
    try {
      new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
      return true
    } catch(e) {
      return false
    }
  }

  var plgs = navigator.plugins
  if(!plgs.length) {
    return false
  }

  return /Shockwave Flash/.test(Array.prototype.map.call(plgs, function(plg) {
    return plg.name
  }))
}
