# NeteaseCloudMusic API Enhanced for Cloudflare Workers

<p align="center">
  <img src="./public/static/neteaselogo.png" alt="NeteaseCloudMusic API Enhanced" />
</p>

<p align="center">
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/bzym2/api-enhanced-for-cloudflare">
    <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/bzym2/api-enhanced-for-cloudflare/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/bzym2/api-enhanced-for-cloudflare/build-dev.yml?style=flat-square&label=CI" alt="CI" />
  </a>
  <a href="https://github.com/bzym2/api-enhanced-for-cloudflare/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/bzym2/api-enhanced-for-cloudflare?style=flat-square" alt="License" />
  </a>
  <a href="https://developers.cloudflare.com/workers/">
    <img src="https://img.shields.io/badge/Cloudflare-Workers-orange?style=flat-square&logo=cloudflare" alt="Cloudflare Workers" />
  </a>
</p>

网易云音乐 API Enhanced 的 Cloudflare Workers 版本。它使用 Wrangler 部署为无服务器 Worker，保留原 API 的路径、请求参数、Cookie、响应结构、状态码和重定向行为。

## 一键部署

点击下面的按钮，将本项目部署到 Cloudflare Workers：

<p>
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/bzym2/api-enhanced-for-cloudflare">
    <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers" />
  </a>
</p>

部署完成后，在 Cloudflare 控制台配置环境变量，然后使用 Worker URL 访问 API。

## 本地开发

环境要求：

- Node.js 18 或更高版本
- pnpm
- Cloudflare 账号（部署时需要）

安装依赖：

```bash
pnpm install
```

生成 Workers 路由和静态数据：

```bash
pnpm worker:routes
```

启动 Wrangler 本地开发服务器：

```bash
pnpm worker:dev
```

默认情况下 Wrangler 会在本地启动开发地址。也可以直接运行：

```bash
npx wrangler dev
```

## 部署

推荐使用项目内置命令：

```bash
pnpm worker:deploy
```

该命令会先生成：

- `src/generated/module-registry.js`
- `src/generated/data.js`

然后执行 `npx wrangler deploy`。

直接运行 `npx wrangler deploy` 可能使用旧的生成文件，因此不建议作为常规部署命令。

首次部署或需要登录时运行：

```bash
npx wrangler login
```

部署前请检查 [wrangler.toml](wrangler.toml) 中的 Worker 名称、Assets 配置和环境变量。

## 环境变量

Cloudflare 环境变量在 `wrangler.toml` 的 `[vars]` 中配置。敏感值建议使用 Cloudflare Secrets，而不是提交到 Git：

```bash
npx wrangler secret put NETEASE_COOKIE
```

支持的配置：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `CORS_ALLOW_ORIGIN` | 空 | 允许的 Origin，多个值用逗号分隔；空值按请求 Origin 处理 |
| `NETEASE_COOKIE` | 空 | 默认网易云 Cookie |
| `ENABLE_RANDOM_CN_IP` | `false` | 是否默认启用随机中国 IP |
| `ENABLE_GENERAL_UNBLOCK` | `false` | 是否启用通用解灰逻辑 |
| `ENABLE_PROXY` | `false` | 是否启用代理 URL 拼接逻辑 |
| `PROXY_URL` | 空 | 代理服务 URL；Workers 不支持 Node HTTP Agent/PAC/tunnel |
| `CHECK_TOKEN_V2` | 空 | 易盾 v2 token，可选 |
| `CHECK_TOKEN_V3` | 空 | 易盾 v3 token，可选 |

`NETEASE_COOKIE`、token 和其他敏感信息不要写入公开仓库或前端代码。

## 兼容行为

Workers 版本保留以下客户端可见行为：

- 原有模块文件名到 API 路径的映射规则。
- `daily_signin`、`fm_trash`、`personal_fm` 等特殊路径。
- GET、POST、PUT、DELETE 等请求方法。
- query、JSON、URL-encoded、text 和 multipart 请求体解析。
- Cookie 解析、`noCookie`、多条 `Set-Cookie` 和 HTTPS Cookie 属性。
- CORS preflight、404、业务状态码和 301 登录提示。
- `redirectUrl` 的真实 HTTP 重定向。
- `api`、`weapi`、`linuxapi`、`eapi` 和 `xeapi` 请求协议。
- Cloudflare Assets 静态资源服务。

## 文件上传

Cloudflare Workers 没有 Node 的临时文件系统，也不适合代理原 Node 服务中 500 MB 的临时文件上传。

云盘上传使用兼容的控制面流程：

1. 调用 `/cloud/upload/token` 获取 token、`uploadUrl`、`objectKey` 和 `resourceId`。
2. 客户端直接将文件上传到网易云 NOS 返回的 `uploadUrl`。
3. 调用 `/cloud/upload/complete` 完成歌曲信息登记和发布。

这种方式保留了客户端接口字段和上传顺序，同时避免 Worker 持有完整大文件。

`voice_upload` 不包含在 Cloudflare Workers 路由中。原 Node 版本文件仍保留在仓库中，但不会被 Workers 部署。

## 测试

运行模拟客户端契约测试和加密向量测试：

```bash
pnpm worker:test
```

测试覆盖：

- JSON、form-urlencoded 和 multipart 请求。
- Cookie、CORS、OPTIONS、404、redirect 和 `noCookie`。
- eapi、linuxapi、weapi、X25519 和 xeapi 签名流程。
- Node 参考实现与 Workers 加密输出的关键对照。

只检查 Wrangler bundle：

```bash
npx wrangler deploy --dry-run
```

Node 原版服务仍可按原方式启动：

```bash
pnpm start
```

## API 文档

原项目 API 路径和参数文档：

- [网易云音乐 API 文档](https://neteasecloudmusicapienhanced.js.org/)

## 项目结构

```text
src/                       Workers 入口和运行时适配层
src/worker.js              Wrangler Workers 入口
src/router.js              静态路由分发
src/request.js             Workers 上游请求适配器
src/crypto.js              Workers 加密协议实现
src/compat/                Cookie、请求、响应、文件兼容层
src/generated/             构建时生成的路由和数据
scripts/generate-worker-*  Workers 构建生成脚本
module/                    API 业务模块
public/                    Cloudflare Assets 静态资源
wrangler.toml              Wrangler 配置
```

## 许可证

本项目使用 [MIT License](LICENSE)。

本项目基于 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 及相关开源项目持续维护。网易云音乐及其相关服务的商标和版权归其各自所有者所有。
