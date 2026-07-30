'use strict'

const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const moduleDir = path.join(root, 'module')
const output = path.join(root, 'src', 'generated', 'module-registry.js')
const special = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm',
}

const unsupportedModules = new Map()

const overrides = new Map(
  Object.entries({
    'audio_match.js': "require('../modules/audio_match.js')",
    'cloud_upload_token.js': "require('../modules/cloud_upload_token.js')",
    'cloud_upload_complete.js': "require('../modules/cloud_upload_complete.js')",
    'related_playlist.js': "require('../modules/related_playlist.js')",
    'register_checktoken_v2.js': "require('../modules/register_checktoken_v2.js')",
    'register_checktoken_v3.js': "require('../modules/register_checktoken_v3.js')",
    'register_anonimous.js': "require('../modules/register_anonimous.js')",
    'register_xeapikey.js': "require('../modules/register_xeapikey.js')",
    'cloud.js': "require('../modules/cloud.js')",
    'scrobble_v1.js': "require('../modules/scrobble_v1.js')",
    'decrypt.js': "require('../modules/decrypt.js')",
    'eapi_decrypt.js': "require('../modules/eapi_decrypt.js')",
  }),
)

const files = fs
  .readdirSync(moduleDir)
  .filter((file) => file.endsWith('.js') && file !== 'voice_upload.js')
  .reverse()

const imports = [
  ...files.map((file, index) => {
    const reason = unsupportedModules.get(file)
    const override = overrides.get(file)
    if (override) {
      return `const module${index} = ${override}`
    }
    if (reason) {
      throw new Error(`Worker route ${file} is not compatible: ${reason}`)
    }
    return `const module${index} = ${override || `require('../../module/${file}')`}`
  }),
]

const definitions = files.map((file, index) => {
  const identifier = file.split('.').shift()
  const route = special[file] || `/${file.replace(/\.js$/i, '').replace(/_/g, '/')}`
  return `  { identifier: ${JSON.stringify(identifier)}, route: ${JSON.stringify(route)}, module: module${index} },`
})

fs.mkdirSync(path.dirname(output), { recursive: true })
fs.writeFileSync(
  output,
  `'use strict'\n\n${imports.join('\n')}\n\nmodule.exports = [\n${definitions.join('\n')}\n]\n`,
)
