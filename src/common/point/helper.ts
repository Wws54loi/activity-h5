const pages: any = []
// 页面栈只保存上一页及当前页
// const Page_Routes = Array(2);
const RouteStack = function (this: RouteStack) {
  this.routes = Array(2)
} as any as { new (): RouteStack }

RouteStack.prototype.push = function (obj: any) {
  this.routes.shift()
  this.routes.push(obj)
}
RouteStack.prototype.getCurrentRoute = function () {
  return this.routes[1]
}
RouteStack.prototype.getPreviousRoute = function () {
  return this.routes[0]
}
RouteStack.prototype.updateCurrentRoute = function (obj: any) {
  this.routes[1] = obj
}

export default class LYDataHelper {
  // 设备id Key
  static DEVICE_ID_KEY = '__ly_data_device_id__'

  // 页面id Key
  static Page_ID_KEY = '__ly_data_page_id__'

  // 页面名字 Key
  static Page_NAME_KEY = '__ly_data_page_name__'

  // 页面进入时间戳
  static Page_ENTER_TIME_KEY = '__ly_data_enter_time__'

  // 页面存放曝光数据 exposures
  static Page_EXPOSURE_KEY = '__ly_data_exposure__'

  // 页面栈只保存上一页及当前页
  static PageRoutes = new RouteStack()

  // 获取当前页面的埋点数据信息
  static getCurrentPageLYDataInfo() {
    try {
      const curRoute = LYDataHelper.PageRoutes.getCurrentRoute()
      if (curRoute) {
        return {
          [LYDataHelper.Page_ID_KEY]: curRoute[LYDataHelper.Page_ID_KEY] || '',
          [LYDataHelper.Page_NAME_KEY]: curRoute[LYDataHelper.Page_NAME_KEY] || '',
          [LYDataHelper.Page_ENTER_TIME_KEY]: curRoute[LYDataHelper.Page_ENTER_TIME_KEY] || '',
        }
      } else {
        return {
          [LYDataHelper.Page_ID_KEY]: '',
          [LYDataHelper.Page_NAME_KEY]: '',
          [LYDataHelper.Page_ENTER_TIME_KEY]: '',
        }
      }
    } catch (error) {
      console.warn('get current page data fail!')
      // 返回空值
      return {
        [LYDataHelper.Page_ID_KEY]: '',
        [LYDataHelper.Page_NAME_KEY]: '',
        [LYDataHelper.Page_ENTER_TIME_KEY]: '',
      }
    }
  }

  // 获取上一页面的埋点数据信息
  static getPreviousPageLYDataInfo() {
    try {
      const prevRoute = LYDataHelper.PageRoutes.getPreviousRoute()
      if (prevRoute) {
        return {
          [LYDataHelper.Page_ID_KEY]: prevRoute[LYDataHelper.Page_ID_KEY] || '',
          [LYDataHelper.Page_NAME_KEY]: prevRoute[LYDataHelper.Page_NAME_KEY] || '',
          [LYDataHelper.Page_ENTER_TIME_KEY]: prevRoute[LYDataHelper.Page_ENTER_TIME_KEY] || '',
        }
      } else {
        return {
          [LYDataHelper.Page_ID_KEY]: '',
          [LYDataHelper.Page_NAME_KEY]: '',
          [LYDataHelper.Page_ENTER_TIME_KEY]: '',
        }
      }
    } catch (error) {
      console.warn('get pervious page data fail!')
      // 返回空值
      return {
        [LYDataHelper.Page_ID_KEY]: '',
        [LYDataHelper.Page_NAME_KEY]: '',
        [LYDataHelper.Page_ENTER_TIME_KEY]: '',
      }
    }
  }

  /**
   * 获取UUID
   * @param {长度} len
   * @param {进制} radix
   */
  static getUUID(len?: number, radix?: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    const uuid = []
    let i
    radix = radix || chars.length
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
      // rfc4122, version 4 form
      let r

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16)
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  }

  // 获取随机事件id
  static randomEventID() {
    return this.getUUID()
  }

  // 设置deviceID
  static setDeviceID() {
    try {
      const deviceID = this.getUUID()
      localStorage.setItem(this.DEVICE_ID_KEY, deviceID)
      return deviceID
    } catch (error) {
      console.error('set device id fail')
      return ''
    }
  }

  // 获取deviceID
  static getDeviceID() {
    try {
      var deviceID = localStorage.getItem(this.DEVICE_ID_KEY)
      if (!deviceID) {
        // 如果没有取到deviceID 需要设置
        return this.setDeviceID()
      }
      return deviceID
    } catch (e) {
      console.error('get device id fail')
    }
  }

  // 随机生成随机页面id
  static randomPageId() {
    return this.getUUID()
  }

  // // 通过path获取page名字
  // static getPageNameByPath(path) {
  //   if (!path) {
  //     console.error("path can't be null")
  //   }
  //   const curPage = pages.find((item) => item.path === path)
  //   if (curPage) {
  //     return curPage.name || path
  //   } else {
  //     return path
  //   }
  // }

  // 组合数据
  static composeLYData(ename: any, common: any, page: any, business: any, pname: any) {
    return {
      c: Object.assign({}, common, { ename }),
      p: Object.assign({}, page, { ename, pname }),
      b: Object.assign({}, business, { ename }),
    }
  }

  static copy(obj: any) {
    var newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
      return
    }
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? LYDataHelper.copy(obj[i]) : obj[i]
    }
    return newobj
  }
}
