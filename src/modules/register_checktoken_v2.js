'use strict'

const { APP_CONF } = require('../../util/config.json')

const URL = APP_CONF.dunDomainV2 + '/v2/config/js?pn=YD00000558929251'

async function readToken(env) {
  if (env.CHECK_TOKEN_V2) return env.CHECK_TOKEN_V2
  if (env.NCM_STATE?.get) return (await env.NCM_STATE.get('check_token_v2')) || ''
  return ''
}

async function writeToken(env, token) {
  if (env.NCM_STATE?.put && token) await env.NCM_STATE.put('check_token_v2', token)
}

async function fetchToken() {
  const res = await fetch(URL, { signal: AbortSignal.timeout(10000) })
  const data = await res.json()
  if (data && data.code === 200 && data.result && data.result.conf) {
    return data.result.conf
  }
  throw new Error('易盾返回异常: ' + JSON.stringify(data).substring(0, 200))
}

module.exports = async (query) => {
  const refresh = query.refresh === '1' || query.refresh === 'true'
  let token = refresh ? '' : await readToken(query.env || {})
  if (!token) {
    token = await fetchToken()
    await writeToken(query.env || {}, token)
  }
  return { status: 200, body: { code: 200, token, registered: !!token } }
}
