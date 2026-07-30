import router from './router.js'
import { applyCorsHeaders } from './compat/cors.js'

async function serveAsset(request, env) {
  if (!env.ASSETS || request.method === 'OPTIONS') return null
  const url = new URL(request.url)
  if (!url.pathname.includes('.') && url.pathname !== '/') return null
  return env.ASSETS.fetch(request)
}

async function fetchHandler(request, env, ctx) {
  const asset = await serveAsset(request, env)
  if (asset) return asset

  const headers = new Headers()
  applyCorsHeaders(headers, request, env)
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  const response = await router.dispatch(request, env, ctx)
  if (response) return response

  return new Response(JSON.stringify({ code: 404, data: null, msg: 'Not Found' }), {
    status: 404,
    headers: {
      ...Object.fromEntries(headers),
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export default { fetch: fetchHandler }
