function parseCorsAllowOrigins(corsAllowOrigin) {
  if (!corsAllowOrigin) return null
  const origins = corsAllowOrigin.split(',').map((origin) => origin.trim()).filter(Boolean)
  return origins.length > 0 ? origins : null
}
function getCorsAllowOrigin(allowOrigins, requestOrigin) {
  if (!allowOrigins) return requestOrigin || '*'
  if (allowOrigins.includes('*')) return '*'
  if (requestOrigin && allowOrigins.includes(requestOrigin)) return requestOrigin
  return null
}
function shouldApplyCors(pathname) {
  return pathname !== '/' && !pathname.includes('.')
}
function applyCorsHeaders(headers, request, env) {
  const url = new URL(request.url)
  if (!shouldApplyCors(url.pathname)) return
  const corsAllowOrigin = getCorsAllowOrigin(parseCorsAllowOrigins(env.CORS_ALLOW_ORIGIN), request.headers.get('Origin'))
  const shouldSetVaryHeader = corsAllowOrigin && corsAllowOrigin !== '*'
  headers.set('Access-Control-Allow-Credentials', 'true')
  if (corsAllowOrigin) headers.set('Access-Control-Allow-Origin', corsAllowOrigin)
  if (shouldSetVaryHeader) headers.set('Vary', 'Origin')
  headers.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  headers.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  headers.set('Content-Type', 'application/json; charset=utf-8')
}
export { applyCorsHeaders, getCorsAllowOrigin, parseCorsAllowOrigins, shouldApplyCors }
