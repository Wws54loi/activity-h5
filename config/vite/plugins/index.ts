/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ConfigSvgIconsPlugin } from './svgIcons'
import { AutoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
import { ConfigMockPlugin } from './mock'
import { ConfigVisualizerConfig } from './visualizer'
import { ConfigCompressPlugin } from './compress'
import { ConfigPagesPlugin } from './pages'
import { ConfigRestartPlugin } from './restart'
import { ConfigVConsolePlugin } from './vconsole'
import { vantPlugin } from './vant'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // 自动按需引入组件
    AutoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 自动生成路由
    ConfigPagesPlugin(),
    // 开启.gz压缩  rollup-plugin-gzip
    ConfigCompressPlugin(),
    //引入vant库
    vantPlugin(),
    // 监听配置文件改动重启
    // ConfigRestartPlugin(),
  ]

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  vitePlugins.push(ConfigMockPlugin(isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(ConfigVisualizerConfig())
  // rollup-plugin-vconsole
  vitePlugins.push(ConfigVConsolePlugin(isBuild))

  return vitePlugins
}
