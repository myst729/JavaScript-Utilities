// http://en.wikipedia.org/wiki/Poisson_distribution

function poisson (expect) {
  var n = 0
  var x = Math.random()
  var limit = Math.exp(-expect)

  while (x > limit) {
    n++
    x *= Math.random()
  }

  return n
}
