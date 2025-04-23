#!/usr/bin/env node

const fs = require('fs')
const filename = process.argv[2]

const hexdump = filename => {
  const buffer = fs.readFileSync(filename)
  const hexLines = []
  for (let i = 0; i < buffer.length; i += 16) {
    const address = i.toString(16).padStart(8, '0')
    const hexArray = Array.from(buffer.subarray(i, i + 16))
    const hexLine = hexArray.map(hex => hex.toString(16).padStart(2, '0'))
    const charLine = hexArray.map(hex => hex >= 0x20 && hex < 0x7f ? String.fromCharCode(hex) : '.')
    if (hexArray.length < 16) {
      hexLine.push(...Array(16 - hexArray.length).fill('  '))
      charLine.push(...Array(16 - hexArray.length).fill(' '))
    }
    hexLines.push(`${address}  ${hexLine.join(' ')}  |${charLine.join('')}|`)
  }
  hexLines.push(buffer.length.toString(16).padStart(8, '0'))
  return hexLines.join('\n')
}

console.log(hexdump(filename))
