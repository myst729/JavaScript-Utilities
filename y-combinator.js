// https://gist.github.com/rwaldron/8857389

// ES3
function Y (le) {
  return (function (f) {
    return f(f)
  })(function (f) {
    return le(function (x) {
      return f(f)(x)
    })
  })
}

var factorial = Y(function (fac) {
  return function (n) {
    return n <= 2 ? n : n * fac(n - 1)
  }
})

factorial(5) // 120


// ES6
let Y = (le => (f => f(f))(f => le((...args) => f(f)(...args))))

let factorial = Y(f => (n => (n < 2 ? 1 : n * f(n - 1))))

factorial(5) // 120
