const createOption = require('../../util/option.js')
const { getFileExtension, getFileMd5, getFileSize, sanitizeFilename } = require('../compat/file-helper.js')

module.exports = async (query, request) => {
  if (!query.songFile) {
    throw { status: 500, body: { msg: '请上传音乐文件', code: 500 } }
  }
  const ext = getFileExtension(query.songFile.name)
  const filename = sanitizeFilename(query.songFile.name)
  const fileSize = await getFileSize(query.songFile)
  const fileMd5 = await getFileMd5(query.songFile)
  const check = await request('/api/cloud/upload/check', { bitrate: '999000', ext: '', length: fileSize, md5: fileMd5, songId: '0', version: 1 }, createOption(query))
  const token = await request('/api/nos/token/alloc', { bucket: '', ext, filename, local: false, nos_product: 3, type: 'audio', md5: fileMd5 }, createOption(query))
  if (!token.body.result || !token.body.result.resourceId) {
    throw { status: 500, body: { code: 500, msg: '获取上传token失败', detail: token.body } }
  }
  if (check.body.needUpload) {
    throw { status: 413, body: { code: 413, msg: 'Cloudflare Workers 版本请使用 /cloud/upload/token 客户端直传流程', detail: { md5: fileMd5, fileSize } } }
  }
  const info = await request('/api/upload/cloud/info/v2', { md5: fileMd5, songid: check.body.songId, filename: query.songFile.name, song: filename, album: '未知专辑', artist: '未知艺术家', bitrate: '999000', resourceId: token.body.result.resourceId }, createOption(query))
  if (info.body.code !== 200) throw { status: info.status || 500, body: { code: info.body.code || 500, msg: info.body.msg || '上传云盘信息失败', detail: info.body } }
  const pub = await request('/api/cloud/pub/v2', { songid: info.body.songId }, createOption(query))
  return { status: 200, body: { ...check.body, ...pub.body }, cookie: check.cookie }
}
