const { md5 } = require('./md5')

function toUint8Array(value) {
  if (value instanceof Uint8Array) return value
  if (value instanceof ArrayBuffer) return new Uint8Array(value)
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
  }
  if (value && value.data !== undefined) return toUint8Array(value.data)
  throw new Error('无法读取文件数据')
}

function fileValue(file) {
  return file?.file || file?.data || file
}

function isFile(file) {
  return !!(file && (file.file instanceof Blob || file.data instanceof Blob))
}

async function getFileSize(file) {
  if (file?.size !== undefined) return file.size
  const value = fileValue(file)
  if (value?.size !== undefined) return value.size
  return toUint8Array(value).byteLength
}

async function getFileMd5(file) {
  if (file?.md5) return file.md5
  const value = fileValue(file)
  const bytes = value instanceof Blob ? new Uint8Array(await value.arrayBuffer()) : toUint8Array(value)
  const digest = await md5(bytes)
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function getUploadData(file) {
  const value = fileValue(file)
  if (value instanceof Blob) return value
  return toUint8Array(value)
}

async function readFileChunk(file, offset, length) {
  const value = fileValue(file)
  if (value instanceof Blob) return value.slice(offset, offset + length)
  return toUint8Array(value).slice(offset, offset + length)
}

function getFileExtension(filename) {
  if (!filename) return 'mp3'
  return filename.includes('.') ? filename.split('.').pop().toLowerCase() : 'mp3'
}

function sanitizeFilename(filename) {
  if (!filename) return 'unknown'
  return filename.replace(/\.[^.]+$/, '').replace(/\s/g, '').replace(/\./g, '_')
}

module.exports = {
  getFileExtension,
  getFileMd5,
  getFileSize,
  getUploadData,
  isFile,
  readFileChunk,
  sanitizeFilename,
}
