import CryptoJS from 'crypto-js'
import encrypt from './crypto.js'
import { cookieObjToString, cookieToJson } from './compat/cookie.js'
const APP_CONF = {
  apiDomain: 'https://interface.music.163.com',
  eapiDomain: 'https://interfacepc.music.163.com',
  xeapiDomain: 'https://interface3.music.163.com',
  domain: 'https://music.163.com',
  encrypt: true,
  encryptResponse: false,
}

const characters = 'abcdefghijklmnopqrstuvwxyz'
const osMap = { pc: { os: 'pc', appver: '3.1.17.204416', osver: 'Microsoft-Windows-10-Professional-build-19045-64bit', channel: 'netease' }, linux: { os: 'linux', appver: '1.2.1.0428', osver: 'Deepin 20.9', channel: 'netease' }, android: { os: 'android', appver: '8.20.20.231215173437', osver: '14', channel: 'xiaomi' }, iphone: { os: 'iPhone OS', appver: '9.0.90', osver: '16.2', channel: 'distribution' }, osx: { os: 'osx', appver: '3.1.10.5100', osver: '15.5', channel: 'netease' } }
const userAgentMap = { weapi: { pc: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0' }, linuxapi: { linux: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36' }, api: { pc: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/3.1.29.205117', android: 'NeteaseMusic/9.1.65.240927161425(9001065);Dalvik/2.1.0 (Linux; U; Android 14; 23013RK75C Build/UKQ1.230804.001)', iphone: 'NeteaseMusic 9.0.90/5038 (iPhone; iOS 16.2; zh_CN)' } }
const DOMAIN = APP_CONF.domain
const API_DOMAIN = APP_CONF.apiDomain
const EAPI_DOMAIN = APP_CONF.eapiDomain
const XEAPI_DOMAIN = APP_CONF.xeapiDomain
const SPECIAL_STATUS_CODES = new Set([201, 302, 400, 502, 800, 801, 802, 803])
const WNMCID = `${Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('')}.${Date.now()}.01.0`
let xeapiSessionId = ''
let xeapiSessionKey = ''
let xeapiPublicKeyCache = null

function chooseUserAgent(crypto, type = 'pc') { return userAgentMap[crypto]?.[type] || '' }
function toBoolean(value) { if (typeof value === 'boolean') return value; if (value === '') return value; return value === 'true' || value == '1' }
function normalizeCookie(cookie) { return typeof cookie === 'string' ? cookieToJson(cookie) : cookie || {} }
function createHeaderCookie(header) { return Object.entries(header).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('; ') }
function requestId() { return `${Date.now()}_${Math.floor(Math.random() * 1000).toString().padStart(4, '0')}` }
function processCookieObject(cookie, uri, options, anonymousToken) {
  const nuid = CryptoJS.lib.WordArray.random(32).toString()
  const os = osMap[cookie.os] || osMap.pc
  const result = { ...cookie, __remember_me: 'true', ntes_kaola_ad: '1', _ntes_nuid: cookie._ntes_nuid || nuid, _ntes_nnid: cookie._ntes_nnid || `${nuid},${Date.now()}`, WNMCID: cookie.WNMCID || WNMCID, WEVNSM: cookie.WEVNSM || '1.0.0', osver: cookie.osver || os.osver, deviceId: cookie.deviceId || options.deviceId || '', os: cookie.os || os.os, channel: cookie.channel || os.channel, appver: cookie.appver || os.appver }
  if (!uri.includes('login')) result.NMTID = CryptoJS.lib.WordArray.random(16).toString()
  if (!result.MUSIC_U) result.MUSIC_A = result.MUSIC_A || anonymousToken || ''
  return result
}
async function stateGet(env, key) { if (env?.[key.toUpperCase()]) return env[key.toUpperCase()]; return env?.NCM_STATE?.get ? (await env.NCM_STATE.get(key)) || '' : '' }
async function statePut(env, key, value) { if (env?.NCM_STATE?.put && value) await env.NCM_STATE.put(key, value) }
async function publicKeyState(env, deviceId) {
  if (xeapiPublicKeyCache) return xeapiPublicKeyCache
  const saved = await stateGet(env, 'xeapi_public_key')
  if (saved) { try { xeapiPublicKeyCache = JSON.parse(saved); return xeapiPublicKeyCache } catch (_) {} }
    const keyModule = await import('./modules/register_xeapikey.js')
    const keyResult = await keyModule.default({ deviceId, env })
    xeapiPublicKeyCache = keyResult.body
  await statePut(env, 'xeapi_public_key', JSON.stringify(xeapiPublicKeyCache))
  return xeapiPublicKeyCache
}
async function timeoutFetch(url, init, timeout) { if (!(timeout > 0)) return fetch(url, init); const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), timeout); try { return await fetch(url, { ...init, signal: controller.signal }) } finally { clearTimeout(timer) } }
function setCookies(headers) { if (typeof headers.getSetCookie === 'function') return headers.getSetCookie(); const value = headers.get('set-cookie') || ''; return value ? value.split(/,(?=[^;]+=)/) : [] }
function hex(bytes) { return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase() }

async function buildRequest(uri, source, options) {
  const headers = { ...(options.headers || {}) }
  const ip = options.realIP || options.ip || ''
  if (ip) { headers['X-Real-IP'] = ip; headers['X-Forwarded-For'] = ip }
  const cookie = processCookieObject(normalizeCookie(options.cookie || await stateGet(options.env, 'anonymous_token')), uri, options, await stateGet(options.env, 'anonymous_token'))
  headers.Cookie = cookieObjToString(cookie)
  let data = { ...source }
  let crypto = options.crypto || (APP_CONF.encrypt ? 'eapi' : 'api')
  data.e_r = toBoolean(options.e_r !== undefined ? options.e_r : APP_CONF.encryptResponse)
  let url
  let encrypted
  if (crypto === 'weapi') { headers.Referer = options.domain || DOMAIN; headers['User-Agent'] = options.ua || chooseUserAgent('weapi'); data.csrf_token = cookie.__csrf || ''; encrypted = encrypt.weapi(data); url = `${options.domain || DOMAIN}/weapi/${uri.substr(5)}` }
  else if (crypto === 'linuxapi') { headers['User-Agent'] = options.ua || chooseUserAgent('linuxapi', 'linux'); encrypted = encrypt.linuxapi({ method: 'POST', url: `${options.domain || DOMAIN}${uri}`, params: data }); url = `${options.domain || DOMAIN}/api/linux/forward` }
  else if (crypto === 'xeapi') { const state = await publicKeyState(options.env, cookie.deviceId || options.deviceId || ''); headers['User-Agent'] = options.ua || chooseUserAgent('api', 'android'); headers['X-Client-Enc-State'] = 'ENCRYPTED'; headers['x-aeapi'] = true; headers['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'; headers['x-deviceid'] = cookie.deviceId; headers['x-os'] = 'android'; headers['x-osver'] = cookie.osver || '16'; headers['x-appver'] = cookie.appver || '9.1.65'; headers['x-sdeviceid'] = cookie.sDeviceId || cookie.deviceId; encrypted = encrypt.xeapi(uri, data, { ...options, publicKeyState: state, sessionId: xeapiSessionId, sessionKey: xeapiSessionKey, deviceId: cookie.deviceId, os: 'android' }); url = `${options.domain || XEAPI_DOMAIN}/xeapi/${uri.substr(5)}` }
  else { const header = { osver: cookie.osver, deviceId: cookie.deviceId, os: cookie.os, appver: cookie.appver, versioncode: cookie.versioncode || '140', mobilename: cookie.mobilename || '', buildver: cookie.buildver || Date.now().toString().substr(0, 10), resolution: cookie.resolution || '1920x1080', __csrf: cookie.__csrf || '', channel: cookie.channel, requestId: requestId() }; if (cookie.MUSIC_U) header.MUSIC_U = cookie.MUSIC_U; if (cookie.MUSIC_A) header.MUSIC_A = cookie.MUSIC_A; headers.Cookie = createHeaderCookie(header); headers['User-Agent'] = options.ua || chooseUserAgent('api', 'iphone'); if (crypto === 'eapi') { data.header = header; encrypted = encrypt.eapi(uri, data); url = `${options.domain || EAPI_DOMAIN}/eapi/${uri.substr(5)}` } else { encrypted = data; url = `${options.domain || API_DOMAIN}${uri}` } }
  headers['Content-Type'] = headers['content-type'] || 'application/x-www-form-urlencoded'
  return { crypto, data, encrypted, headers, url }
}

async function parseResponse(response, crypto, encryptedResponse) {
  const bytes = new Uint8Array(await response.arrayBuffer())
  if (crypto === 'xeapi') {
    const sessionId = response.headers.get('x-encr-ssid')
    const sessionKey = response.headers.get('x-encr-sskey')
    if (sessionId && sessionKey) {
      xeapiSessionId = sessionId
      xeapiSessionKey = sessionKey
    }
    return encrypt.xeapiResDecrypt(bytes)
  }
  if (encryptedResponse) {
    const decrypted = encrypt.eapiResDecrypt(hex(bytes), response.headers.get('x-aeapi') === 'true')
    if (response.headers.get('x-aeapi') === 'true' && decrypted === null) {
      throw new Error('eapi gzip response decrypt failed')
    }
    return decrypted
  }
  const text = new TextDecoder().decode(bytes)
  try { return JSON.parse(text) } catch (_) { return text }
}
async function request(uri, data = {}, options = {}) {
  try {
    const built = await buildRequest(uri, data, options)
    const response = await timeoutFetch(built.url, { method: 'POST', headers: built.headers, body: new URLSearchParams(built.encrypted) }, options.timeout)
    const cookies = setCookies(response.headers).map((cookie) => cookie.replace(/\s*Domain=[^;]+;*/gi, ''))
    const body = await parseResponse(response, built.crypto, (built.crypto === 'eapi' || built.crypto === 'weapi') && (built.data.e_r || data.e_r))
    if (body?.code) body.code = Number(body.code)
    let status = Number(body?.code || response.status)
    if (SPECIAL_STATUS_CODES.has(body?.code)) status = 200
    status = status > 100 && status < 600 ? status : 400
    const answer = { status, body, cookie: cookies }
    if (status === 200) return answer
    throw answer
  } catch (error) {
    if (error?.body) throw error
    throw { status: 502, body: { code: 502, msg: error?.message || String(error) }, cookie: [] }
  }
}
export default request
