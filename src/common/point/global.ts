import LYDataHelper from './helper'

export default class LYDataGlobal {
    // 设备id
    static get device_id () {
        return LYDataHelper.getDeviceID()
    }

    // 平台类型
    static get platform_type () {
        return 'h5'
    }

    // 平台版本
    static get platform_version() {
        return window.navigator.userAgent
    }

    // 设备品牌(同平台版本)
    static get brand() {
        return ''
    }

    // 设备型号(同平台版本)
    static get brand_version() {
        return ''
    }
    
    // 分辨率_高
    static get resolution_height() {
        return window.screen.height
    }

    static get screen_heihgt() {
        return window.screen.height
    }

    // 分辨率_宽
    static get resolution_width() {
        return window.screen.width
    }

    static get screen_width() {
        return window.screen.width
    }
    
    // 操作系统类型
    static get os_type() {
        return window.navigator.platform
    }

    // 操作系统版本
    static get os_version() {
        return window.navigator.platform
    }
}