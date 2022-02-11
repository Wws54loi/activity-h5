import {
  getUid,
  trackData,
  goOrderList,
  getLocation,
  payment,
  getNameSpace,
  setTitle,
  goLogin,
  goHome,
  toTutorialList,
  onGetCouponListClick,
  getPageName,
  getPagePid,
  setPageEndPid,
  openAssistant,
  openWXMini,
  toOrderResult,
  onGetGroupClick,
  onGetGroupClickParams,
  toTutorialListParams,
  getIsNgw,
} from './hybridUtils'
import { useClientStore, useUserStore } from '@/store'
import dsBridge from 'dsbridge'

// 判断小程序环境
export const __miniComputed = async () => {
  const clientStore = await useClientStore()
  const wx = window.wx
  return new Promise((resolve, reject) => {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('miniProgram') !== -1) {
      clientStore.setIsmini(true)
      resolve(true)
    }
    // 是否为微信环境
    if (
      ua
        .match(/MicroMessenger/i)
        ?.toString()
        .toLowerCase() == 'micromessenger'
    ) {
      wx.miniProgram.getEnv((res: any) => {
        clientStore.setIsmini(res.miniprogram)
        resolve(res.miniprogram)
      })
      // // 等待回调1s 不知道干嘛用 先注释
      // setTimeout(() => {
      //   clientStore.setIsmini(true)
      //   resolve(true)
      // }, 1000)
    } else {
      clientStore.setIsmini(false)
      resolve(false)
    }
  })
}
// 获取uid check：是否判断原生环境
export const __getUid = async () => {
  const clientStore = await useClientStore()
  const userStore = await useUserStore()
  if (!clientStore.ismini) {
    if (getIsNgw()) {
      clientStore.setIsNgw(true)
    }
    const { uid, token } = getUid(true)
    if (token) {
      clientStore.setToken(token)
    }
    if (uid) {
      userStore.setUid(uid)
    }
  }
}

//     // 获取地理位置
export const __getLocation = async () => {
  const userStore = await useUserStore()
  const clientStore = await useClientStore()
  if (!clientStore.ismini) {
    const location = getLocation()
    userStore.setLocation(JSON.parse(location))
  }
}

//     // 支付
export const __payment = async (options: any) => {
  const clientStore = await useClientStore()
  const opts = Object.assign(
    {},
    {
      orderNum: '',
      price: '',
      orderName: '',
      remainingSeconds: 300,
      type: 8,
      costBalance: 0,
      refresh: true,
    },
    options,
  )
  console.log('订单信息 :>> ', opts)
  if (clientStore.ismini) {
    const wx = window.wx
    wx.miniProgram.navigateTo({
      url: `/v3/pages/public/pay/index?needPush=1&orderNum=${opts.orderNum}&price=${
        opts.price
      }&flag=${opts.flag || ''}&orderName=${encodeURIComponent(opts.orderName || '')}`,
    })
  } else {
    // 调用原生收银台支付
    payment(opts)
  }
}

//     // 跳转支付成功页面(app调用)
export const __toOrderResult = (options: any) => {
  const opts = Object.assign({}, { orderNum: '', price: 0, type: 9, payType: 4 }, options)
  console.log('订单成功信息 :>> ', opts)
  toOrderResult(opts)
}

//     // 数据上报 h5自主上报埋点 此api不知道何时使用
//     __trackData(pname, ename, business) {
//       if (this.$data.$$ismini) {
//         wx.miniProgram.postMessage({
//           data: {
//             trace: {
//               pname,
//               ename,
//               b: business,
//             },
//           },
//         })
//       } else {
//         trackData(pname, ename, business)
//       }
//     },

//     // goOrderList 订单列表
export const __goOrderList = async () => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    wx.miniProgram.navigateTo({
      url: `/pages/orderList`,
    })
  } else {
    goOrderList()
  }
}

//     // 原生是否注册方法
export const __hasNativeMethod = async (methodName: string) => {
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    return true
  } else {
    const nameSpace = getNameSpace()
    return dsBridge.hasNativeMethod(nameSpace + methodName)
  }
}

//     // 原生设置title
export const __setTitle = async (title?: string) => {
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    console.log(title)

    document.title = title || '懒人Club'
  } else {
    setTitle(title || '懒人Club')
  }
}

//     // 登录
export const __goLogin = async () => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    const url = clientStore.isLryj
      ? '/v3/authorized/pages/guide/index'
      : '/subpackages/auth/guidePage/guidePage'
    wx.miniProgram.navigateTo({ url })
  } else {
    goLogin({
      refresh: true,
    })
  }
}

//     // 去首页
export const __goHome = async () => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    const url = clientStore.isLryj ? '/v3/pages/index/index' : '/pages/homePage/homePage'
    wx.miniProgram.switchTab({ url })
  } else {
    goHome()
  }
}
//     // 去预约小班课传参
export const __toTutorialListParams = async (params: any = null) => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    let url = '/v3/pages/course/small-group/list/index'
    if (params) {
      url += '?'
      for (let key in params) {
        console.log(key)
        url += key + '=' + params[key] + '&'
      }
      wx.miniProgram.redirectTo({
        url,
      })
    } else {
      wx.miniProgram.navigateTo({
        url: '/v3/pages/course/small-group/list/index',
      })
    }
  } else {
    if (params) {
      toTutorialListParams(params)
    } else {
      toTutorialList()
    }
  }
}
//     // 去预约团操课
export const __onGetGroupClick = async (params: any = null) => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    let url = '/v3/pages/course/group/list/index'
    if (params) {
      url += '?'
      for (let key in params) {
        console.log(key)
        url += key + '=' + params[key] + '&'
      }
    }
    wx.miniProgram.redirectTo({
      url,
    })
  } else {
    if (params) {
      onGetGroupClick()
    } else {
      onGetGroupClickParams(params)
    }
  }
}
// 去优惠券列表
export const __onGetCouponListClick = async () => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    wx.miniProgram.navigateTo({
      url: '/pages/couponList',
    })
  } else {
    onGetCouponListClick()
  }
}

//     // 跳转小程序
export const __openAssistant = async (appid: string, path: string) => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    wx.miniProgram.navigateTo({
      url: `/v3/pages/public/mini-navigator/index?appId=${appid}&path=${encodeURIComponent(path)}`,
    })
  } else {
    openAssistant({
      appId: appid,
      path: path,
    })
  }
}
//     /**
//      *
//      * @param {小程序id} appid
//      * @param {路径} path
//      * @param {弹窗内容} msg
//      * @param {返回首页判断} backHome
//      */
//     // openWXMini
export const __openWXMini = async (appid: string, path: string, msg?: string, backHome = false) => {
  const wx = window.wx
  const clientStore = await useClientStore()
  if (clientStore.ismini) {
    wx.miniProgram.navigateTo({
      url: `/v3/pages/public/mini-navigator/index?backHome=${
        backHome || ''
      }&appId=${appid}&path=${encodeURIComponent(path)}`,
    })
  } else {
    openWXMini({
      appId: appid,
      path: path,
      alertMsg: msg || '即将打开小程序',
      backHome: backHome,
    })
  }
}
//   // 特殊处理
//   beforeRouteLeave(to, from, next) {
//     // 导航离开该组件的对应路由时调用
//     // 可以访问组件实例 `this`
//     // 小程序没有返回键处理
//     if (this.$data.$$ismini && to.query.miniProxy) {
//       next(false)
//       const backRefresh = !!to.query.backRefresh
//       if (backRefresh) {
//         wx.miniProgram.navigateTo({
//           url:
//             '/v3/pages/public/h5/index?br=1&url=' +
//             encodeURIComponent(window.location.origin + to.fullPath),
//         })
//       } else {
//         wx.miniProgram.navigateTo({
//           url:
//             '/v3/pages/public/h5/index?url=' +
//             encodeURIComponent(window.location.origin + to.fullPath),
//         })
//       }
//     } else {
//       next()
//     }
//   },
// }
