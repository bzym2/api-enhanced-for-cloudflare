'use strict'

module.exports = async (query) => {
  const res = await fetch(`https://music.163.com/playlist?id=${query.id}`)
  const html = await res.text()
  try {
    const pattern =
      /<div class="cver u-cover u-cover-3">[\s\S]*?<img src="([^"]+)">[\s\S]*?<a class="sname f-fs1 s-fc0" href="([^"]+)"[^>]*>([^<]+?)<\/a>[\s\S]*?<a class="nm nm f-thide s-fc3" href="([^"]+)"[^>]*>([^<]+?)<\/a>/g
    let result
    const playlists = []
    while ((result = pattern.exec(html)) != null) {
      playlists.push({
        creator: {
          userId: result[4].slice('/user/home?id='.length),
          nickname: result[5],
        },
        coverImgUrl: result[1].slice(0, -'?param=50y50'.length),
        name: result[3],
        id: result[2].slice('/playlist?id='.length),
      })
    }
    return { status: 200, body: { code: 200, playlists } }
  } catch (err) {
    throw { status: 500, body: { code: 500, msg: err.stack }, cookie: [] }
  }
}
