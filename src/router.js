import modules from './generated/module-registry.js'
import { buildModuleQuery, createRequestContext } from './compat/request-context.js'
import { errorToResponse, moduleResponseToResponse } from './compat/response.js'
import { generateRandomChineseIP, randomDeviceId } from './state.js'
import request from './request.js'

function findModule(pathname) {
  return modules.find((definition) => definition.route === pathname)
}

function createModuleRequest(context) {
  return async (uri, data, options = {}) => request(uri, data, {
    ...options,
    env: context.env,
    deviceId: context.deviceId,
    ip: options.randomCNIP ? generateRandomChineseIP() : options.ip || context.ip,
  })
}

async function dispatch(requestObject, env) {
  const context = await createRequestContext(requestObject, env)
  const definition = findModule(context.url.pathname)
  if (!definition) return null

  const query = buildModuleQuery(context)
  query.env = env
  query.realIP = query.realIP || context.ip
  query.cnIp = generateRandomChineseIP()
  query.deviceId = query.deviceId || randomDeviceId()
  context.deviceId = query.deviceId
  try {
    const result = await definition.module(query, createModuleRequest(context))
    return moduleResponseToResponse(result, query, requestObject, env)
  } catch (error) {
    return errorToResponse(error, query, requestObject, env)
  }
}

export default { dispatch }
export { dispatch, findModule }
