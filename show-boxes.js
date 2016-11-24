// Originally from https://gist.github.com/wintercn/5617888

function randomColor () {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

function showBoxes (window) {
  var rects = []

  function getRects (node) {
    var range = window.document.createRange()
    range.setStartBefore(node)
    range.setEndAfter(node)
    rects.push.apply(rects, range.getClientRects())

    for (var i = 0; i < node.children.length; i++) {
      getRects(node.children[i])
    }
  }

  getRects(window.document.documentElement)

  rects = rects.map(function (rect) {
    return `<rect x="${rect.left}" y="${rect.top}" width="${rect.width}" height="${rect.height}" style="fill:${randomColor()};fill-opacity:0.1;stroke:black;stroke-width:1;" />`
  })

  window.open(`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg">${rects.join('')}</svg>`)
}

showBoxes(window)
