'use strict'

module.exports = async (query) => {
  const url = new URL('https://interface.music.163.com/api/music/audio/match')
  url.searchParams.set('sessionId', '0123456789abcdef')
  url.searchParams.set('algorithmCode', 'shazam_v2')
  url.searchParams.set('duration', query.duration)
  url.searchParams.set('rawdata', query.audioFP)
  url.searchParams.set('times', '1')
  url.searchParams.set('decrypt', '1')

  const res = await fetch(url.toString())
  const body = await res.json()
  return {
    status: 200,
    body: {
      code: 200,
      data: body.data,
    },
  }
}
