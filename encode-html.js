/* forked from zswang */

function encodeHTML (text) {
  return String(text).replace(/["<>& ]/g, function (all) {
    return "&" + {
      '"': 'quot',
      '<': 'lt',
      '>': 'gt',
      '&': 'amp',
      ' ': 'nbsp'
    }[all] + ";"
  })
}
