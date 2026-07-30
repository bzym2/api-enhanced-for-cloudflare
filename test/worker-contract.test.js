'use strict'

const assert = require('assert')

let fetchHandler
let createRequestContext
let moduleResponseToResponse
let errorToResponse

function jsonResponse(body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json', ...headers },
  })
}

describe('Cloudflare Worker client compatibility', () => {
  before(async () => {
    ;({ default: { fetch: fetchHandler } } = await import('../src/worker.js'))
    ;({ createRequestContext } = await import('../src/compat/request-context.js'))
    ;({ moduleResponseToResponse, errorToResponse } = await import('../src/compat/response.js'))
  })
  const env = {
    CORS_ALLOW_ORIGIN: 'https://client.example',
    ENABLE_RANDOM_CN_IP: 'false',
  }
  let originalFetch
  let calls

  beforeEach(() => {
    originalFetch = global.fetch
    calls = []
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('keeps api route query/body/cookie semantics', async () => {
    global.fetch = async (input, init) => {
      calls.push({ input: String(input), init })
      return jsonResponse(
        { code: 200, data: { ok: true } },
        { 'set-cookie': 'MUSIC_U=upstream; Domain=music.163.com; Path=/' },
      )
    }

    const response = await fetchHandler(
      new Request('https://worker.example/api?uri=%2Ftest&crypto=api', {
        method: 'POST',
        headers: {
          Origin: 'https://client.example',
          Cookie: 'MUSIC_U=client',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: JSON.stringify({ hello: 'world' }) }),
      }),
      env,
    )

    assert.equal(response.status, 200)
    assert.equal(response.headers.get('access-control-allow-origin'), 'https://client.example')
    assert.match(response.headers.get('set-cookie'), /MUSIC_U=upstream/)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].input, 'https://interface.music.163.com/test')
    assert.match(calls[0].init.headers.Cookie, /MUSIC_U=client/)
    assert.match(await response.text(), /"ok":true/)
  })

  it('returns the legacy CORS preflight and 404 shape', async () => {
    const options = await fetchHandler(
      new Request('https://worker.example/banner', {
        method: 'OPTIONS',
        headers: { Origin: 'https://client.example' },
      }),
      env,
    )
    assert.equal(options.status, 204)
    assert.equal(options.headers.get('access-control-allow-methods'), 'PUT,POST,GET,DELETE,OPTIONS')

    const missing = await fetchHandler(
      new Request('https://worker.example/not-found', {
        headers: { Origin: 'https://client.example' },
      }),
      env,
    )
    assert.equal(missing.status, 404)
    assert.deepEqual(await missing.json(), { code: 404, data: null, msg: 'Not Found' })
  })

  it('preserves errors, redirects, noCookie, and repeated form fields', async () => {
    const request = new Request('https://worker.example/song/url/v1/302', { headers: { Origin: 'https://client.example' } })
    const query = { noCookie: false }
    const redirect = moduleResponseToResponse({ status: 302, body: '', redirectUrl: 'https://music.example/track', cookie: ['a=1', 'b=2'] }, query, request, env)
    assert.equal(redirect.status, 302)
    assert.equal(redirect.headers.get('location'), 'https://music.example/track')
    assert.match(redirect.headers.get('set-cookie'), /a=1/)
    const hidden = moduleResponseToResponse({ status: 200, body: { code: 200 }, cookie: ['a=1'] }, { noCookie: true }, request, env)
    assert.equal(hidden.headers.get('set-cookie'), null)
    const error = errorToResponse({ status: 200, body: { code: '301', msg: 'old' }, cookie: [] }, query, request, env)
    assert.deepEqual(await error.json(), { code: 301, msg: '需要登录' })
    const context = await createRequestContext(new Request('https://worker.example/search?a=1&a=2', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'keywords=x' }), env)
    assert.deepEqual(context.query.a, ['1', '2'])
    assert.equal(context.body.keywords, 'x')
  })

  it('parses multipart files with the legacy field names', async () => {
    global.fetch = async () => jsonResponse({ code: 200, data: { received: true } })
    const form = new FormData()
    form.set('uri', '/test')
    form.set('crypto', 'api')
    form.set('file', new File(['audio'], 'track.mp3', { type: 'audio/mpeg' }))

    const response = await fetchHandler(
      new Request('https://worker.example/api', { method: 'POST', body: form }),
      env,
    )
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { code: 200, data: { received: true } })
  })
})
