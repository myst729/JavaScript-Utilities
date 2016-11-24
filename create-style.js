function createStyle (styleText) {
  var style = document.createElement('style')
  style.type = 'text/css'
  document.body.appendChild(style)

  if (style.styleSheet) {
    // IE
    style.styleSheet.cssText = styleText
  } else {
    style.appendChild(document.createTextNode(styleText))
  }
}
