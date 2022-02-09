/**
 * @name visualizer
 * @description npm run build 自动打开
 */
import visualizer from 'rollup-plugin-visualizer';
import { ANALYSIS } from '../../constant';

export function ConfigVisualizerConfig() {
    if (ANALYSIS) {
        return visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
        });
    }
    return [];
}