import data from './generated/data.js'
const { chinaIPRanges, chinaIPRangesTotalCount } = data

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function intToIp(int) { return [(int >>> 24) & 0xff, (int >>> 16) & 0xff, (int >>> 8) & 0xff, int & 0xff].join('.') }
function generateRandomChineseIP() {
  const total = chinaIPRangesTotalCount || 0
  if (!total) return `116.${getRandomInt(25, 94)}.${getRandomInt(1, 255)}.${getRandomInt(1, 255)}`
  let offset = Math.floor(Math.random() * total)
  let chosen = null
  for (const range of chinaIPRanges) {
    if (offset < range.count) { chosen = range; break }
    offset -= range.count
  }
  if (!chosen) chosen = chinaIPRanges[chinaIPRanges.length - 1]
  return intToIp(chosen.start + Math.floor(Math.random() * chosen.count))
}
function randomDeviceId() {
  const chars = '0123456789ABCDEF'
  let value = ''
  for (let i = 0; i < 52; i++) value += chars[Math.floor(Math.random() * chars.length)]
  return value
}
export { generateRandomChineseIP, randomDeviceId }
