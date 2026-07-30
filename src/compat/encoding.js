'use strict'

function bytesToHex(bytes) {
  let output = ''
  for (let i = 0; i < bytes.length; i++) {
    output += bytes[i].toString(16).padStart(2, '0')
  }
  return output
}

function hexToBytes(hex) {
  const clean = hex.replace(/\s+/g, '')
  const bytes = new Uint8Array(clean.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

function utf8ToBytes(text) {
  return new TextEncoder().encode(String(text))
}

function bytesToUtf8(bytes) {
  return new TextDecoder().decode(bytes)
}

function bytesToBase64(bytes) {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

function base64ToBytes(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function concatBytes(...arrays) {
  const total = arrays.reduce((sum, arr) => sum + arr.length, 0)
  const output = new Uint8Array(total)
  let offset = 0
  for (const arr of arrays) {
    output.set(arr, offset)
    offset += arr.length
  }
  return output
}

function toArrayBuffer(bytes) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
}

module.exports = {
  base64ToBytes,
  bytesToBase64,
  bytesToHex,
  bytesToUtf8,
  concatBytes,
  hexToBytes,
  toArrayBuffer,
  utf8ToBytes,
}
