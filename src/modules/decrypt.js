const cryptoHelper = require('../crypto.js')
const CryptoJS = require('crypto-js')

const linuxapiKey = 'rFgB&h#%2?^eDg:Q'

module.exports = async (query) => {
  const crypto = query.crypto || 'eapi'
  const data = query.data || query.hexString || ''
  const isReq = query.isReq !== 'false'
  if (!data) return { status: 400, body: { code: 400, message: 'data is required' } }

  try {
    let result
    switch (crypto) {
      case 'eapi': {
        const pureHex = data.replace(/\s/g, '')
        result = isReq ? cryptoHelper.eapiReqDecrypt(pureHex) : await cryptoHelper.eapiResDecrypt(pureHex)
        break
      }
      case 'weapi': {
        if (isReq) {
          return { status: 400, body: { code: 400, message: 'weapi 请求解密需要 RSA 私钥，暂不支持；仅支持 weapi 返回数据解密（e_r=true 时与 eapi 相同）' } }
        }
        result = await cryptoHelper.eapiResDecrypt(data.replace(/\s/g, ''))
        break
      }
      case 'linuxapi': {
        if (isReq) {
          const decrypted = cryptoHelper.aesDecrypt(data.replace(/\s/g, ''), linuxapiKey, '', 'hex')
          result = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
        } else result = typeof data === 'string' ? JSON.parse(data) : data
        break
      }
      case 'xeapi': {
        if (isReq) {
          return { status: 400, body: { code: 400, message: 'xeapi 请求解密涉及 X25519 ECDH 密钥交换，流程复杂，暂不支持；仅支持 xeapi 返回数据解密' } }
        }
        result = cryptoHelper.xeapiResDecrypt(data)
        break
      }
      case 'api':
        result = typeof data === 'string' ? JSON.parse(data) : data
        break
      default:
        return { status: 400, body: { code: 400, message: `未知加密方式: ${crypto}` } }
    }
    return { status: 200, body: { code: 200, data: result } }
  } catch (error) {
    return { status: 400, body: { code: 400, message: `解密失败: ${error.message}` } }
  }
}
