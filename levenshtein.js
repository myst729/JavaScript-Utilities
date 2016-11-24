// https://gist.github.com/wintercn/9876664

function levenshtein (a, b) {
  var table = [[[]]]

  for (var j = 1; j <= b.length; j++) {
    table[0][j] = b.slice(0, j).map(function (e, j) {
      return {
        action: 'insert',
        element: e,
        position: j
      }
    })
  }

  for (var i = 0; i < a.length; i++) {
    table[i + 1] = []
    table[i + 1][0] = a.slice(0, i + 1).map(function (e, i) {
      return {
        action: 'insert',
        element: e,
        position: i
      }
    })

    for (var j = 0; j < b.length; j++) {
      var f = [{
        action: 'replace',
        position: j,
        element: [a[i], b[j]]
      }]
      if (a[i] === b[j]) {
        f = []
      }
      console.log(table[i][j].concat(f), table[i + 1][j], table[i][j + 1])

      table[i+1][j+1] = [
        table[i][j].concat(f),
        table[i + 1][j].concat([{
          action: 'insert',
          position: j,
          element: b[j]
        }]),
        table[i][j + 1].concat([{
          action: 'delete',
          position: j,
          element: a[i + 1]
        }])
      ].sort(function (x, y) {
        return x.length - y.length
      })[0]
      // document.write(table[i + 1][j + 1].length)
      // document.write('\t')
    }
    // document.write('<br>')
  }
    
  for (var i = 0; i <= a.length; i++) {
    for (var j = 0; j <= b.length; j++) {
      // if (i)
      document.write(table[i][j] && table[i][j].length)
      document.write('\t')
    } 
    document.write('<br>')
  }

  document.write(table[a.length][b.length].map(function (e) {
    return e.action + ' ' + e.element
  }).join('\n'))
}

// levenshtein('sailn'.split(''), 'failing'.split(''))
levenshtein('ac'.split(''), 'a2c'.split(''))
