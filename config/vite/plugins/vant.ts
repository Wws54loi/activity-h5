/**
 * @name vant
 * @description vant样式库
 */
import styleImport, { VantResolve } from 'vite-plugin-style-import'
export const vantPlugin = () => {
  return styleImport({
    resolves: [VantResolve()],
  })
}
