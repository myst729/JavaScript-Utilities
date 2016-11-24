/* forked from zswang */

function cloneObject (obj) {
  var i
  var o

  if (arguments.callee.caller === arguments.callee) { // run recursively
    for (i = 0; i < arguments.callee.objList.length; i++) {
      if (obj === arguments.callee.objList[i][0]) {
        return arguments.callee.objList[i][1]
      }
    }
  } else { // first run
    arguments.callee.objList = []
  }

  o = obj instanceof Array ? [] : {}
  arguments.callee.objList.push([obj, o])

  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? arguments.callee(obj[i]) : obj[i]
    }
  }

  if (arguments.callee.caller !== arguments.callee) { // end of first run
    arguments.callee.objList = null
  }

  return o
}
