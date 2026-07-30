import { appendCookies } from './cookie.js'
import { applyCorsHeaders } from './cors.js'

function createJsonResponse(body, status, request, env, headers = new Headers()) {
  applyCorsHeaders(headers, request, env)
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(body), { status, headers })
}
function normalizeStatus(status) {
  const value = Number(status)
  return value > 100 && value < 600 ? value : 400
}
function moduleResponseToResponse(moduleResponse, query, request, env) {
  const headers = new Headers()
  applyCorsHeaders(headers, request, env)
  appendCookies(headers, moduleResponse.cookie, request.url, query.noCookie)
  if (moduleResponse.redirectUrl) {
    headers.set('Location', moduleResponse.redirectUrl)
    return new Response(null, { status: normalizeStatus(moduleResponse.status || 302), headers })
  }
  headers.set('Content-Type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(moduleResponse.body), { status: normalizeStatus(moduleResponse.status), headers })
}
function errorToResponse(moduleResponse, query, request, env) {
  if (!moduleResponse || !moduleResponse.body) return createJsonResponse({ code: 404, data: null, msg: 'Not Found' }, 404, request, env)
  if (moduleResponse.body.code == '301') moduleResponse.body.msg = '需要登录'
  const headers = new Headers()
  applyCorsHeaders(headers, request, env)
  appendCookies(headers, moduleResponse.cookie, request.url, query.noCookie)
  headers.set('Content-Type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(moduleResponse.body), { status: normalizeStatus(moduleResponse.status), headers })
}
export { createJsonResponse, errorToResponse, moduleResponseToResponse }
