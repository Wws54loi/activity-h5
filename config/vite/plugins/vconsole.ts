/**
 * @name Vconsole
 * @description 移动端打印日志
 */
import { viteVConsole } from 'vite-plugin-vconsole'
import path from 'path'
export const ConfigVConsolePlugin = (isBuild: boolean) => {
  return viteVConsole({
    entry: path.resolve('src/main.ts'),
    localEnabled: true,
    enabled: true,
    config: {
      maxLogNumber: 1000,
      theme: 'dark',
    },
  })
}
