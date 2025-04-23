#!/usr/bin/env node

const fs = require('fs')
const filename: string = process.argv[2]

function hexdump(filename: string): string {
  const buffer: Buffer = fs.readFileSync(filename)
  const hexLines: string[] = []
  for (let i = 0; i < buffer.length; i += 16) {
    const address: string = i.toString(16).padStart(8, '0')
    const hexArray: number[] = Array.from(buffer.subarray(i, i + 16))
    const hexLine: string[] = hexArray.map((hex) => hex.toString(16).padStart(2, '0'))
    const charLine: string[] = hexArray.map((hex) => (hex >= 0x20 && hex < 0x7f ? String.fromCharCode(hex) : '.'))
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
