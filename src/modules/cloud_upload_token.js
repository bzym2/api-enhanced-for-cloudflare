'use strict'

const createOption = require('../../util/option.js')

async function fetchJson(url, init = {}) {
  const response = await fetch(url, init)
  const text = await response.text()
  let body
  try {
    body = JSON.parse(text)
  } catch (_) {
    body = text
  }
  if (!response.ok) {
    throw new Error(typeof body === 'string' ? body : JSON.stringify(body))
  }
  return body
}

module.exports = async (query, request) => {
  const { md5, fileSize, filename, bitrate = 999000 } = query
  if (!md5 || !fileSize || !filename) {
    throw {
      status: 400,
      body: { code: 400, msg: '缺少必要参数: md5, fileSize, filename' },
    }
  }

  const ext = filename.includes('.') ? filename.split('.').pop() : 'mp3'
  const checkRes = await request(
    '/api/cloud/upload/check',
    {
      bitrate: String(bitrate),
      ext: '',
      length: fileSize,
      md5,
      songId: '0',
      version: 1,
    },
    createOption(query),
  )
  const bucket = 'jd-musicrep-privatecloud-audio-public'
  const tokenRes = await request(
    '/api/nos/token/alloc',
    {
      bucket,
      ext,
      filename: filename.replace(/\.[^.]+$/, '').replace(/\s/g, '').replace(/\./g, '_'),
      local: false,
      nos_product: 3,
      type: 'audio',
      md5,
    },
    createOption(query, 'weapi'),
  )

  const result = tokenRes.body.result
  if (!result || !result.objectKey) {
    throw {
      status: 500,
      body: { code: 500, msg: '获取上传token失败', detail: tokenRes.body },
    }
  }

  let lbs
  try {
    lbs = await fetchJson(
      `https://wanproxy.127.net/lbs?version=1.0&bucketname=${bucket}`,
    )
  } catch (error) {
    throw {
      status: 500,
      body: { code: 500, msg: '获取上传服务器地址失败', detail: error.message },
    }
  }
  if (!lbs?.upload?.[0]) {
    throw {
      status: 500,
      body: { code: 500, msg: '获取上传服务器地址无效', detail: lbs },
    }
  }

  return {
    status: 200,
    body: {
      code: 200,
      data: {
        needUpload: checkRes.body.needUpload,
        songId: checkRes.body.songId,
        uploadToken: result.token,
        objectKey: result.objectKey,
        resourceId: result.resourceId,
        uploadUrl: `${lbs.upload[0]}/${bucket}/${result.objectKey.replace(/\//g, '%2F')}?offset=0&complete=true&version=1.0`,
        bucket,
        md5,
        fileSize,
        filename,
      },
    },
    cookie: checkRes.cookie,
  }
}
