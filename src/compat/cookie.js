import decode from 'safe-decode-uri-component'

function parseHeaderCookie(cookieHeader = '') {
  const cookies = {}
  cookieHeader.split(/;\s+|(?<!\s)\s+$/g).forEach((pair) => {
    const crack = pair.indexOf('=')
    if (crack < 1 || crack === pair.length - 1) return
    cookies[decode(pair.slice(0, crack)).trim()] = decode(pair.slice(crack + 1)).trim()
  })
  return cookies
}
function cookieToJson(cookie) {
  if (!cookie) return {}
  const cookieArr = cookie.split(';')
  const obj = {}
  for (let i = 0, len = cookieArr.length; i < len; i++) {
    const arr = cookieArr[i].split('=')
    if (arr.length === 2) obj[arr[0].trim()] = arr[1].trim()
  }
  return obj
}
function cookieObjToString(cookie) {
  const keys = Object.keys(cookie)
  const result = []
  for (let i = 0, len = keys.length; i < len; i++) result[i] = `${encodeURIComponent(keys[i])}=${encodeURIComponent(cookie[keys[i]])}`
  return result.join('; ')
}
function appendCookies(headers, cookies, requestUrl, noCookie) {
  if (noCookie || !Array.isArray(cookies) || cookies.length === 0) return
  const isHttps = new URL(requestUrl).protocol === 'https:'
  for (const cookie of cookies) headers.append('Set-Cookie', isHttps ? `${cookie}; SameSite=None; Secure` : cookie)
}
export { appendCookies, cookieObjToString, cookieToJson, parseHeaderCookie }
