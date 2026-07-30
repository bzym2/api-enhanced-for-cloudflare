import { cookieToJson, parseHeaderCookie } from './cookie.js'

function paramsToObject(params) {
  const result = {}
  for (const [key, value] of params) {
    if (result[key] === undefined) result[key] = value
    else if (Array.isArray(result[key])) result[key].push(value)
    else result[key] = [result[key], value]
  }
  return result
}

async function parseBody(request) {
  const contentType = request.headers.get('content-type') || ''
  if (request.method === 'GET' || request.method === 'HEAD') return {}

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const body = {}
    const files = {}
    for (const [key, value] of form.entries()) {
      if (typeof value === 'string') body[key] = value
      else files[key] = { name: value.name, mimetype: value.type || 'application/octet-stream', size: value.size, data: value, file: value }
    }
    return { body, files }
  }

  if (contentType.includes('application/json')) {
    const text = await request.text()
    try { return { body: text ? JSON.parse(text) : {} } } catch (_) { return { body: {} } }
  }

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('text/plain')) {
    return { body: paramsToObject(new URLSearchParams(await request.text())) }
  }
  return {}
}

async function createRequestContext(request, env) {
  const url = new URL(request.url)
  const parsed = await parseBody(request)
  const query = paramsToObject(url.searchParams)
  const cookies = parseHeaderCookie(request.headers.get('cookie') || '')
  const body = parsed.body || {}
  const files = parsed.files || {}
  for (const item of [query, body]) {
    if (item && typeof item.cookie === 'string') item.cookie = cookieToJson(decodeURIComponent(item.cookie))
  }
  return {
    env, files, method: request.method, query, request,
    requestOrigin: request.headers.get('Origin') || '', body, cookies,
    ip: request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || '', url,
  }
}

function buildModuleQuery(context) {
  return Object.assign({}, { cookie: context.cookies }, context.query, context.body, context.files)
}

export { buildModuleQuery, createRequestContext, parseBody, paramsToObject }
