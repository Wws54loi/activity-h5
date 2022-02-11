/**
 * @埋点配置文件
 */

const open = true
const LYDataConfig = {
  switch: open, // 上报及注入开关
  api: import.meta.env.VITE_APP_API_BASETPOINTURL + 'lazyCollector/collect', // 上报api
  platform: 'h5', // 平台
  version: '1.0.0', // 版本号
}

export default LYDataConfig
