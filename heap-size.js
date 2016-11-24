function checkHeapSize (lastUsed = 0) {
  if (window.performance.memory.usedJSHeapSize < lastUsed) {
    console.log('Garbage collected!');
  }
  setTimeout(checkHeapSize, 100, window.performance.memory.usedJSHeapSize)
}

checkHeapSize()
