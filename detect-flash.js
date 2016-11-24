function detectFlash () {
  if (window.ActiveXObject) {
    try {
      new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
      return true
    } catch (e) {
      return false
    }
  }

  var plugins = navigator.plugins
  if (!plugins.length) {
    return false
  }

  return /Shockwave Flash/.test(Array.prototype.map.call(plugins, plugin => plugin.name))
}
