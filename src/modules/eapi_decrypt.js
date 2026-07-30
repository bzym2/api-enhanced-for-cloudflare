const crypto = require('../crypto.js')

module.exports = async (query) => {
  const hexString = query.hexString
  const isReq = query.isReq != 'false'
  if (!hexString) {
    return { status: 400, body: { code: 400, message: 'hex string is required' } }
  }
  const pureHexString = hexString.replace(/\s/g, '')
  return {
    status: 200,
    body: {
      code: 200,
      data: isReq
        ? crypto.eapiReqDecrypt(pureHexString)
        : await crypto.eapiResDecrypt(pureHexString),
    },
  }
}
