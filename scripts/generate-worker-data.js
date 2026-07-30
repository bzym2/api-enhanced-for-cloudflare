'use strict'

const fs = require('fs')
const path = require('path')

function ipToInt(ip) {
  const parts = ip.split('.').map(Number)
  return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3]
}

function parseCIDR(cidr) {
  const [ipStr, prefixLengthStr] = cidr.split('/')
  const prefixLength = parseInt(prefixLengthStr, 10)
  const ipInt = ipToInt(ipStr)
  const mask = (0xffffffff << (32 - prefixLength)) >>> 0
  const start = (ipInt & mask) >>> 0
  const end = (start | (~mask >>> 0)) >>> 0
  const count = end - start + 1
  return { start, end, count, cidr }
}

const root = path.resolve(__dirname, '..')
const input = path.join(root, 'data', 'china_ip_ranges.txt')
const output = path.join(root, 'src', 'generated', 'data.js')
const lines = fs
  .readFileSync(input, 'utf-8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
const chinaIPRanges = lines.map(parseCIDR).sort((a, b) => b.count - a.count)
const chinaIPRangesTotalCount = chinaIPRanges.reduce(
  (total, range) => total + range.count,
  0,
)

fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(
  output,
  `'use strict'\n\nmodule.exports = ${JSON.stringify({ chinaIPRanges, chinaIPRangesTotalCount })}\n`,
)
