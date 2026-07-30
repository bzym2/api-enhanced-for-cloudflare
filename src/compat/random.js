'use strict'

function randomFloat() {
  const bytes = new Uint32Array(1)
  crypto.getRandomValues(bytes)
  return bytes[0] / 0x100000000
}

function randomInt(min, max) {
  return Math.floor(randomFloat() * (max - min + 1)) + min
}

function randomString(chars, length) {
  let output = ''
  for (let i = 0; i < length; i++) {
    output += chars.charAt(randomInt(0, chars.length - 1))
  }
  return output
}

module.exports = {
  randomFloat,
  randomInt,
  randomString,
}
