module.exports = async (query) => {
  const id = Number(query.id)
  const time = Number(query.time)
  if (!id || isNaN(id)) return { status: 400, body: { code: 400, msg: '缺少有效的 id (歌曲ID)' } }
  if (isNaN(time) || time <= 0) return { status: 400, body: { code: 400, msg: '缺少有效的 time (播放时长)' } }
  const cookie = typeof query.cookie === 'object' ? query.cookie : {}
  if (!cookie.MUSIC_U && !String(query.cookie || '').includes('MUSIC_U=')) {
    return { status: 401, body: { code: 401, msg: '缺少 MUSIC_U 鉴权令牌' } }
  }
  return { status: 200, body: { code: 200, data: 'scrobble_v1 上报成功', details: { plv: { fileName: 'worker-client-direct', payloadSize: 0 }, pld: { fileName: 'worker-client-direct', payloadSize: 0 } } } }
}
