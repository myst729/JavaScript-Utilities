function uuid() {
  const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

uuid() // 'f7a626f6-99e6-c2df-d686-e39b32a9c8dd'
uuid() // '7b79829a-da8f-b1b4-1a11-11eec689400d'
uuid() // '170642de-d866-a51e-66ca-985443519116'
