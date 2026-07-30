const createOption = (query, crypto = '', checkToken = false) => {
  const env = query.env || {}
  const processEnv =
    typeof process !== 'undefined' && process.env ? process.env : {}
  const enableRandomCNIP =
    (env.ENABLE_RANDOM_CN_IP || processEnv.ENABLE_RANDOM_CN_IP) === 'true'

  return {
    crypto: query.crypto || crypto || '',
    cookie: query.cookie || env.NETEASE_COOKIE || processEnv.NETEASE_COOKIE,
    ua: query.ua || '',
    proxy: query.proxy,
    realIP: query.realIP,
    randomCNIP: enableRandomCNIP
      ? !['false', false].includes(query.randomCNIP)
      : ['true', true].includes(query.randomCNIP),
    e_r: query.e_r || undefined,
    domain: query.domain || '',
    checkToken: query.checkToken || checkToken,
    headers: query.headers || {},
    timeout: query.timeout || 0,
  }
}
module.exports = createOption
