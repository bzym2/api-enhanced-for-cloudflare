import CryptoJS from 'crypto-js'
import { x25519 } from '@noble/curves/ed25519.js'

const iv = '0102030405060708'
const presetKey = '0CoJUm6Qyw8W8jud'
const linuxapiKey = 'rFgB&h#%2?^eDg:Q'
const eapiKey = 'e82ckenh8dichen8'
const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB
-----END PUBLIC KEY-----`
const xeapiStaticKey = hexToBytes('ab1d5a430f6bb04a3f01e81ddd72bd916d5ce591248ac128714806d7f8fb1b84')
const xeapiSignKey = 'mUHCwVNWJbunMqAHf5MImuirT6plvs6VSFW62MGHstFQxhBGdEoIhLItH3djc4+FB/OKty3+lL2rGeoFBpVe5g=='

function base64ToBytes(value) {
  const text = atob(value)
  return Uint8Array.from(text, (char) => char.charCodeAt(0))
}

function bytesToBase64(bytes) {
  let text = ''
  for (const byte of bytes) text += String.fromCharCode(byte)
  return btoa(text)
}

function hexToBytes(hex) {
  const clean = hex.replace(/\s+/g, '')
  const bytes = new Uint8Array(clean.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function bytesToUtf8(bytes) {
  return new TextDecoder().decode(bytes)
}

function utf8ToBytes(text) {
  return new TextEncoder().encode(String(text))
}

function concatBytes(...parts) {
  const output = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0))
  let offset = 0
  for (const part of parts) {
    output.set(part, offset)
    offset += part.length
  }
  return output
}

function randomBytes(size) {
  const bytes = new Uint8Array(size)
  globalThis.crypto.getRandomValues(bytes)
  return bytes
}

function wordArrayToBytes(wordArray) {
  const bytes = new Uint8Array(wordArray.sigBytes)
  for (let i = 0; i < wordArray.sigBytes; i++) {
    bytes[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
  }
  return bytes
}

function bytesToWordArray(bytes) {
  const words = []
  for (let i = 0; i < bytes.length; i++) {
    words[i >>> 2] |= bytes[i] << (24 - (i % 4) * 8)
  }
  return CryptoJS.lib.WordArray.create(words, bytes.length)
}

function bytesToBigInt(bytes) {
  return BigInt(`0x${bytesToHex(bytes)}`)
}

function bigIntToBytes(value, length) {
  const output = new Uint8Array(length)
  for (let i = length - 1; i >= 0; i--) {
    output[i] = Number(value & 0xffn)
    value >>= 8n
  }
  return output
}

function modPow(base, exp, mod) {
  let result = 1n
  base %= mod
  while (exp > 0n) {
    if (exp & 1n) result = (result * base) % mod
    base = (base * base) % mod
    exp >>= 1n
  }
  return result
}

function aesEncrypt(text, mode, key, vector, format = 'base64') {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(text),
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(vector),
      mode: CryptoJS.mode[mode.toUpperCase()],
      padding: CryptoJS.pad.Pkcs7,
    },
  )
  return format === 'base64'
    ? encrypted.toString()
    : encrypted.ciphertext.toString().toUpperCase()
}

function aesDecrypt(ciphertext, key, vector, format = 'base64') {
  const options = {
    iv: CryptoJS.enc.Utf8.parse(vector),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }
  return format === 'base64'
    ? CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), options)
    : CryptoJS.AES.decrypt(
        { ciphertext: CryptoJS.enc.Hex.parse(ciphertext) },
        CryptoJS.enc.Utf8.parse(key),
        options,
      )
}

function aesEcbEncryptBytes(key, plaintext) {
  return wordArrayToBytes(
    CryptoJS.AES.encrypt(bytesToWordArray(plaintext), bytesToWordArray(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).ciphertext,
  )
}

function aesEcbDecryptBytes(key, ciphertext) {
  return wordArrayToBytes(
    CryptoJS.AES.decrypt(
      { ciphertext: bytesToWordArray(ciphertext) },
      bytesToWordArray(key),
      { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 },
    ),
  )
}

function rsaEncrypt(str, key = publicKey) {
  const der = base64ToBytes(
    key.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '').replace(/\s/g, ''),
  )
  const marker = der.findIndex(
    (value, index) => value === 0x02 && der[index + 1] === 0x81 && der[index + 2] === 0x81,
  )
  const modulus = der.slice(marker + 3, marker + 3 + 128)
  return bytesToHex(
    bigIntToBytes(modPow(bytesToBigInt(utf8ToBytes(str)), 65537n, bytesToBigInt(modulus)), modulus.length),
  )
}

function weapi(object) {
  const text = JSON.stringify(object)
  let secretKey = ''
  for (let i = 0; i < 16; i++) {
    secretKey += base62.charAt(Math.round(Math.random() * 61))
  }
  return {
    params: aesEncrypt(aesEncrypt(text, 'cbc', presetKey, iv), 'cbc', secretKey, iv),
    encSecKey: rsaEncrypt(secretKey.split('').reverse().join('')),
  }
}

function linuxapi(object) {
  return { eparams: aesEncrypt(JSON.stringify(object), 'ecb', linuxapiKey, '', 'hex') }
}

function eapi(url, object) {
  const text = typeof object === 'object' ? JSON.stringify(object) : object
  const digest = CryptoJS.MD5(`nobody${url}use${text}md5forencrypt`).toString()
  return {
    params: aesEncrypt(`${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`, 'ecb', eapiKey, '', 'hex'),
  }
}

async function maybeGunzip(bytes) {
  if (!(bytes[0] === 0x1f && bytes[1] === 0x8b)) return bytes
  const stream = new Response(bytes).body.pipeThrough(new DecompressionStream('gzip'))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

async function eapiResDecrypt(encryptedParams, aeapi = false) {
  try {
    const decrypted = aesDecrypt(encryptedParams, eapiKey, '', 'hex')
    if (!aeapi) return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    const raw = base64ToBytes(decrypted.toString(CryptoJS.enc.Base64))
    return JSON.parse(bytesToUtf8(await maybeGunzip(raw)))
  } catch (_) {
    return null
  }
}

function eapiReqDecrypt(encryptedParams) {
  const decryptedData = aesDecrypt(encryptedParams, eapiKey, '', 'hex').toString(CryptoJS.enc.Utf8)
  const match = decryptedData.match(/(.*?)-36cd479b6b5-(.*?)-36cd479b6b5-(.*)/)
  return match ? { url: match[1], data: JSON.parse(match[2]) } : null
}

function decrypt(cipher) {
  return CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(cipher) }, eapiKey, { mode: CryptoJS.mode.ECB }),
  )
}

async function hmacSha256(key, data) {
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    'raw',
    typeof key === 'string' ? utf8ToBytes(key) : key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return new Uint8Array(await globalThis.crypto.subtle.sign('HMAC', cryptoKey, data))
}

function xeapiMidTransform(ciphertext, random = randomBytes(16)) {
  const xored = new Uint8Array(ciphertext.length)
  for (let i = 0; i < ciphertext.length; i++) xored[i] = ciphertext[i] ^ random[i & 0x0f]
  const b64 = utf8ToBytes(bytesToBase64(xored))
  const rotation = b64.length ? (random[0] & 0x0f) % b64.length : 0
  return concatBytes(random, b64.slice(rotation), b64.slice(0, rotation))
}

async function xeapiEncryptS(dynamicKey, publicKeyState, os) {
  const peerRaw = base64ToBytes(publicKeyState.publicKey)
  const privateKey = randomBytes(32)
  const ephemeralRaw = x25519.getPublicKey(privateKey)
  const sharedSecret = x25519.getSharedSecret(privateKey, peerRaw)
  const prk = await hmacSha256(new Uint8Array(32), sharedSecret)
  const aesKey = (await hmacSha256(prk, concatBytes(ephemeralRaw, Uint8Array.from([1])))).slice(0, 16)
  const ivBytes = randomBytes(12)
  const key = await globalThis.crypto.subtle.importKey('raw', aesKey, { name: 'AES-GCM' }, false, ['encrypt'])
  const plaintext = utf8ToBytes(`${bytesToBase64(dynamicKey)}|${os}|${publicKeyState.sk || ''}`)
  const encrypted = new Uint8Array(
    await globalThis.crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivBytes }, key, plaintext),
  )
  return concatBytes(ephemeralRaw, ivBytes, encrypted)
}

function buildXeapiPlaintext(uri, data, options = {}) {
  const fields = {}
  const contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8'
  const mediaType = contentType.split(';', 1)[0].toLowerCase()
  if (mediaType !== 'application/x-www-form-urlencoded') fields.contentType = contentType
  const method = (options.method || 'POST').toUpperCase()
  if (method !== 'POST') fields.method = method
  const url = new URL(uri, 'https://interface.music.163.com')
  if (url.search) fields.queryString = url.search.slice(1)
  if (data !== undefined && data !== null) {
    const bodyData = { ...data }
    delete bodyData.e_r
    fields.body = bytesToBase64(utf8ToBytes(new URLSearchParams(bodyData).toString()))
  }
  fields.queryString = fields.queryString ? `${fields.queryString}&e_r=true` : 'e_r=true'
  return JSON.stringify(fields)
}

async function xeapi(uri, data, options = {}) {
  const publicKeyState = options.publicKeyState
  if (!publicKeyState) throw new Error('xeapi publicKeyState is required')
  const activeSessionKey = options.sessionKey ? utf8ToBytes(String(options.sessionKey)) : null
  const activeSessionId = options.sessionId || ''
  const dynamicKey = activeSessionKey || randomBytes(16)
  const plaintext = utf8ToBytes(buildXeapiPlaintext(uri, data, options))
  const b = aesEcbEncryptBytes(dynamicKey, xeapiMidTransform(aesEcbEncryptBytes(xeapiStaticKey, plaintext)))
  const s = await xeapiEncryptS(dynamicKey, publicKeyState, options.os || 'android')
  const r = aesEcbEncryptBytes(
    xeapiStaticKey,
    utf8ToBytes(`${publicKeyState.version}|${activeSessionKey ? activeSessionId : ''}`),
  )
  return { B: bytesToBase64(b), S: bytesToBase64(s), R: bytesToBase64(r) }
}

async function xeapiResDecrypt(body) {
  const bytes = body instanceof Uint8Array ? body : new Uint8Array(body)
  const decrypted = aesEcbDecryptBytes(utf8ToBytes(eapiKey), bytes)
  return JSON.parse(bytesToUtf8(await maybeGunzip(decrypted)))
}

async function xeapiDecryptPublicKey(encryptedData) {
  const decrypted = aesEcbDecryptBytes(xeapiStaticKey, base64ToBytes(encryptedData))
  return JSON.parse(bytesToUtf8(decrypted))
}

async function xeapiSign(timestamp, nonce) {
  return bytesToBase64(await hmacSha256(xeapiSignKey, utf8ToBytes(String(timestamp) + nonce)))
}

export default {
  weapi,
  linuxapi,
  eapi,
  xeapi,
  decrypt,
  aesEncrypt,
  aesDecrypt,
  eapiReqDecrypt,
  eapiResDecrypt,
  xeapiSign,
  xeapiResDecrypt,
  xeapiDecryptPublicKey,
}
export {
  weapi,
  linuxapi,
  eapi,
  xeapi,
  decrypt,
  aesEncrypt,
  aesDecrypt,
  eapiReqDecrypt,
  eapiResDecrypt,
  xeapiSign,
  xeapiResDecrypt,
  xeapiDecryptPublicKey,
}
