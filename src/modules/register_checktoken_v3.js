'use strict'

const { APP_CONF } = require('../../util/config.json')

const URL = APP_CONF.dunDomainV3 + '/v3/b?pn=YD00000558929251'

async function readToken(env) {
  if (env.CHECK_TOKEN_V3) return env.CHECK_TOKEN_V3
  if (env.NCM_STATE?.get) return (await env.NCM_STATE.get('check_token_v3')) || ''
  return ''
}

async function writeToken(env, token) {
  if (env.NCM_STATE?.put && token) await env.NCM_STATE.put('check_token_v3', token)
}

async function fetchToken() {
  const res = await fetch(URL, { signal: AbortSignal.timeout(10000) })
  const body = await res.text()
  const m = body.match(/null\(\[(\d+),\d+,"([^"]+)"\]\)/)
  if (m && m[1] === '200') return m[2]
  throw new Error('易盾返回异常: ' + body.substring(0, 100))
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
