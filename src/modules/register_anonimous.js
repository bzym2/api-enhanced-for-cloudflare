import CryptoJS from 'crypto-js'
import createOption from '../../util/option.js'
import { randomDeviceId } from '../state.js'

const ID_XOR_KEY_1 = '3go8&$8*3*3h0k(2)2'

function encodeId(id) {
  let xored = ''
  for (let i = 0; i < id.length; i++) {
    xored += String.fromCharCode(
      id.charCodeAt(i) ^ ID_XOR_KEY_1.charCodeAt(i % ID_XOR_KEY_1.length),
    )
  }
  return CryptoJS.enc.Base64.stringify(CryptoJS.MD5(CryptoJS.enc.Utf8.parse(xored)))
}

export default async function registerAnonymous(query, request) {
  const deviceId = query.deviceId || randomDeviceId()
  const username = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(`${deviceId} ${encodeId(deviceId)}`),
  )
  const result = await request(
    '/api/register/anonimous',
    { username },
    createOption({ ...query, deviceId }, 'xeapi'),
  )
  if (result.body.code !== 200) return result
  return {
    status: 200,
    body: { ...result.body, cookie: result.cookie.join(';') },
    cookie: result.cookie,
  }
}

export { registerAnonymous }