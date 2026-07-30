import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { x25519 } from '@noble/curves/ed25519.js'
import {
  aesEncrypt,
  eapi,
  eapiReqDecrypt,
  eapiResDecrypt,
  linuxapi,
  weapi,
  xeapi,
  xeapiSign,
} from '../src/crypto.js'

const require = createRequire(import.meta.url)
const nodeCrypto = require('../util/crypto.js')

function hex(bytes) { return Buffer.from(bytes).toString('hex') }

describe('Workers crypto compatibility vectors', () => {
  it('matches the RFC7748 X25519 shared secret', () => {
    const alicePrivate = Uint8Array.from(Buffer.from('77076d0a7318a57d3c16c17251b26645df4c2f87ebc0992ab177fba51db92c2a', 'hex'))
    const bobPrivate = Uint8Array.from(Buffer.from('5dab087e624a8a4b79e17f8b83800ee6f3d1e4c2f4e4a4f1f0c2f0b8a8b8d8a4', 'hex'))
    const alicePublic = x25519.getPublicKey(alicePrivate)
    const bobPublic = x25519.getPublicKey(bobPrivate)
    assert.equal(hex(x25519.getSharedSecret(alicePrivate, bobPublic)), hex(x25519.getSharedSecret(bobPrivate, alicePublic)))
  })

  it('matches Node eapi request ciphertext exactly', () => {
    const uri = '/api/test'
    const data = { hello: 'world', value: 1 }
    assert.equal(eapi(uri, data).params, nodeCrypto.eapi(uri, data).params)
  })

  it('matches Node AES-ECB protocol ciphertext exactly', () => {
    const input = JSON.stringify({ method: 'POST', url: '/api/test', params: { hello: 'world' } })
    assert.equal(
      aesEncrypt(input, 'ecb', 'rFgB&h#%2?^eDg:Q', '', 'hex'),
      nodeCrypto.aesEncrypt(input, 'ecb', 'rFgB&h#%2?^eDg:Q', '', 'hex'),
    )
  })

  it('round trips eapi request through the Workers decryptor', () => {
    const encrypted = nodeCrypto.eapi('/api/test', { hello: 'world' }).params
    assert.deepEqual(eapiReqDecrypt(encrypted), { url: '/api/test', data: { hello: 'world' } })
  })
  it('keeps eapi and linuxapi output fields', () => {
    const eapiResult = eapi('/api/test', { hello: 'world' })
    const linuxResult = linuxapi({ method: 'POST', url: '/api/test', params: { hello: 'world' } })
    assert.match(eapiResult.params, /^[0-9A-F]+$/)
    assert.match(linuxResult.eparams, /^[0-9A-F]+$/)
  })


  it('keeps weapi output fields', () => {
    const result = weapi({ hello: 'world' })
    assert.match(result.params, /^[A-Za-z0-9+/=]+$/)
    assert.match(result.encSecKey, /^[0-9a-f]+$/)
    assert.equal(result.encSecKey.length, 256)
  })

  it('builds xeapi B/S/R with a supplied peer key', async () => {
    const peer = x25519.getPublicKey(new Uint8Array(32).fill(7))
    const result = await xeapi('/api/test', { hello: 'world' }, {
      publicKeyState: { publicKey: Buffer.from(peer).toString('base64'), version: '1', sk: 'secret' },
    })
    assert.match(result.B, /^[A-Za-z0-9+/=]+$/)
    assert.match(result.S, /^[A-Za-z0-9+/=]+$/)
    assert.match(result.R, /^[A-Za-z0-9+/=]+$/)
  })
  it('returns the xeapi signing format', async () => {
    const signature = await xeapiSign('1700000000000', '1234567890123456')
    assert.match(signature, /^[A-Za-z0-9+/=]+$/)
  })
})
