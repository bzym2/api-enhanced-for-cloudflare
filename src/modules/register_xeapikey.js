import encrypt from '../crypto.js'
import { APP_CONF } from '../config.js'

function randomNonce() {
  let nonce = ''
  for (let i = 0; i < 16; i++) nonce += Math.floor(Math.random() * 10)
  return nonce
}

export default async function registerXeapiKey(query) {
  const nonce = randomNonce()
  const timestamp = String(Date.now())
  const deviceId = query.deviceId || query.env?.DEVICE_ID || ''
  const data = {
    appVersion: '9.1.65',
    currentKeyVersion: query.currentKeyVersion || '',
    deviceId,
    nonce,
    os: 'android',
    requestType: 'active',
    signature: await encrypt.xeapiSign(timestamp, nonce),
    t1: '',
    t2: '',
    timestamp,
    uid: '',
  }

  const response = await fetch(
    `${APP_CONF.apiDomain}/api/gorilla/anti/crawler/security/key/get`,
    {
      method: 'POST',
      headers: {
        'User-Agent':
          'NeteaseMusic/9.1.65.240927161425(9001065);Dalvik/2.1.0 (Linux; U; Android 14; 23013RK75C Build/UKQ1.230804.001)',
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: deviceId ? `deviceId=${encodeURIComponent(deviceId)}` : '',
      },
      body: new URLSearchParams(data),
    },
  )
  const body = await response.json()
  if (!body?.data?.encryptedData || body.code !== 200) {
    throw new Error('xeapi public key request failed')
  }
  if (
    !body.data.signature ||
    (await encrypt.xeapiSign(body.data.timestamp, nonce)) !== body.data.signature
  ) {
    throw new Error('xeapi public key response signature mismatch')
  }

  const publicKey = await encrypt.xeapiDecryptPublicKey(body.data.encryptedData)
  if (!publicKey.sk) throw new Error('xeapi public key response missing sk')
  return { status: 200, body: { ...publicKey, deviceId }, cookie: [] }
}

export { registerXeapiKey }