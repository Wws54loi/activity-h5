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
  onGetGroupClickParams,
  toTutorialListParams,
  getIsNgw,
} from './hybridUtils'
import { useClientStore } from '@/store'
const wx = window.wx
const clientStore = useClientStore()
// 是否微信环境
const ismini = computed(() => {
  return clientStore.ismini
})
// const nativeMixin = {
  // data() {
  //   return {
  //     $$ismini: false, //是否为微信环境
  //     isLryj: true,
  //   }
  // },
    // 判断小程序环境
    export const __miniComputed = ()=> {
      return new Promise((resolve, reject) => {
        const ua = window.navigator.userAgent.toLowerCase()
        if (ua.indexOf('miniProgram') !== -1) {
          clientStore.setIsmini(true)
          resolve(true)
        }
      })
    }
        // 是否为微信环境
//         if (ua.match(/MicroMessenger/i)?.toString().toLowerCase() == 'micromessenger') {
//           console.log('微信环境')
//           wx.miniProgram.getEnv((res:any) => {
//             clientStore.setIsmini(res.miniprogram)
//             resolve(res.miniprogram)
//           })
//           // 等待回调1s
//           setTimeout(() => {
//             clientStore.setIsmini(true)
//             resolve(true)
//           }, 1000)
//         } else {
//           clientStore.setIsmini(false)
//           resolve(false)
//         }
//       })
//     },

//     // 获取uid check：是否判断原生环境
//     __getUid(check = false) {
//       if (check) {
//         if (this.$data.$$ismini) {
//           if (this.$route.query.isNgw) {
//             window.sessionStorage.setItem('isNgw', true)
//           }
//           if (this.$route.query.token) {
//             window.sessionStorage.setItem('token', this.$route.query.token)
//           }
//           return this.$route.query.uid
//         } else {
//           if (getIsNgw()) {
//             window.sessionStorage.setItem('isNgw', true)
//           }
//           const { uid, token } = getUid(true)
//           if (token) {
//             window.sessionStorage.setItem('token', token)
//           }
//           return uid || ''
//         }
//       } else {
//         if (getIsNgw() || this.$route.query.isNgw) {
//           window.sessionStorage.setItem('isNgw', true)
//         }
//         const { uid, token } = getUid(true)
//         if (token || this.$route.query.isNgw) {
//           window.sessionStorage.setItem('token', token || this.$route.query.token)
//         }
//         return uid || this.$route.query.uid
//       }
//     },

//     // 获取地理位置
//     __getLocation() {
//       if (this.$data.$$ismini) {
//         return this.$route.query.location
//       } else {
//         return getLocation()
//       }
//     },

//     // 获取解析过的地理位置
//     __getParseLocation() {
//       let location = this.__getLocation()
//       if (location) {
//         try {
//           location = JSON.parse(location)
//         } catch (error) {
//           console.error(error)
//           location = null
//         }
//       }
//       if (location) {
//         location = Object.assign(
//           {
//             cityId: '',
//             lat: '',
//             lng: '',
//           },
//           location,
//         )
//       } else {
//         location = {
//           cityId: '',
//           lat: '',
//           lng: '',
//         }
//       }
//       // console.log(location);
//       return location
//     },

//     // 支付
//     __payment(options) {
//       const opts = Object.assign(
//         {},
//         {
//           orderNum: '',
//           price: '',
//           orderName: '',
//           remainingSeconds: 300,
//           type: 8,
//           costBalance: 0,
//           refresh: true,
//         },
//         options,
//       )
//       console.log('opts :>> ', opts)
//       if (this.$data.$$ismini) {
//         wx.miniProgram.navigateTo({
//           url: `/v3/pages/public/pay/index?needPush=1&orderNum=${opts.orderNum}&price=${
//             opts.price
//           }&flag=${opts.flag || ''}&orderName=${encodeURIComponent(opts.orderName || '')}`,
//         })
//       } else {
//         // 调用原生收银台支付
//         payment(opts)
//       }
//     },

//     // 跳转支付成功页面(app调用)
//     __toOrderResult(options) {
//       const opts = Object.assign({}, { orderNum: '', price: 0, type: 9, payType: 4 }, options)
//       console.log('toOrderResult :>> ', opts)
//       toOrderResult(opts)
//     },

//     // 数据上报
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
//     __goOrderList() {
//       if (this.$data.$$ismini) {
//         wx.miniProgram.navigateTo({
//           url: `/pages/orderList`,
//         })
//       } else {
//         goOrderList()
//       }
//     },

//     // 原生是否注册方法
//     __hasNativeMethod(methodName) {
//       if (this.$data.$$ismini) {
//         return true
//       } else {
//         const nameSpace = getNameSpace()
//         return dsBridge.hasNativeMethod(nameSpace + methodName)
//       }
//     },

//     // 原生设置title
//     __setTitle(title, check = true) {
//       if (check) {
//         if (this.$data.$$ismini) {
//           document.title = title || '懒人Club'
//         } else {
//           setTitle(title || '懒人Club')
//         }
//       } else {
//         document.title = title || '懒人Club'
//         setTitle(title || '懒人Club')
//       }
//     },

//     // 登录
//     __goLogin() {
//       if (this.$data.$$ismini) {
//         const url = this.$data.isLryj
//           ? '/v3/authorized/pages/guide/index'
//           : '/subpackages/auth/guidePage/guidePage'
//         wx.miniProgram.navigateTo({ url })
//       } else {
//         goLogin({
//           refresh: true,
//         })
//       }
//     },

//     // 去首页
//     __goHome() {
//       if (this.$data.$$ismini) {
//         const url = this.$data.isLryj ? '/v3/pages/index/index' : '/pages/homePage/homePage'
//         wx.miniProgram.switchTab({ url })
//       } else {
//         goHome()
//       }
//     },

//     // 去预约小班课
//     __toTutorialList() {
//       if (this.$data.$$ismini) {
//         wx.miniProgram.navigateTo({
//           url: '/v3/pages/course/small-group/list/index',
//         })
//       } else {
//         toTutorialList()
//       }
//     },
//     // 去预约小班课传参
//     __toTutorialListParams(params = null) {
//       if (this.$data.$$ismini) {
//         let url = '/v3/pages/course/small-group/list/index'
//         if (params) {
//           url += '?'
//           for (let key in params) {
//             console.log(key)
//             url += key + '=' + params[key] + '&'
//           }
//           wx.miniProgram.redirectTo({
//             url,
//           })
//         }
//       } else {
//         toTutorialListParams(params)
//       }
//     },
//     // 去预约团操课
//     __onGetGroupClick(params = null) {
//       if (this.$data.$$ismini) {
//         let url = '/v3/pages/course/group/list/index'
//         if (params) {
//           url += '?'
//           for (let key in params) {
//             console.log(key)
//             url += key + '=' + params[key] + '&'
//           }
//         }
//         console.log(url)
//         wx.miniProgram.redirectTo({
//           url,
//         })
//       } else {
//         onGetGroupClickParams(params)
//       }
//     },
//     // 去优惠券列表
//     __onGetCouponListClick() {
//       if (this.$data.$$ismini) {
//         wx.miniProgram.navigateTo({
//           url: '/pages/couponList',
//         })
//       } else {
//         onGetCouponListClick()
//       }
//     },

//     // 跳转小程序
//     __openAssistant(appid, path) {
//       if (this.$data.$$ismini) {
//         wx.miniProgram.navigateTo({
//           url: `/v3/pages/public/mini-navigator/index?appId=${appid}&path=${encodeURIComponent(
//             path,
//           )}`,
//         })
//       } else {
//         openAssistant({
//           appId: appid,
//           path: path,
//         })
//       }
//     },
//     /**
//      *
//      * @param {小程序id} appid
//      * @param {路径} path
//      * @param {弹窗内容} msg
//      * @param {返回首页判断} backHome
//      */
//     // openWXMini
//     __openWXMini(appid, path, msg, backHome = false) {
//       if (this.$data.$$ismini) {
//         wx.miniProgram.navigateTo({
//           url: `/v3/pages/public/mini-navigator/index?backHome=${
//             backHome || ''
//           }&appId=${appid}&path=${encodeURIComponent(path)}`,
//         })
//       } else {
//         openWXMini({
//           appId: appid,
//           path: path,
//           alertMsg: msg || '即将打开小程序',
//           backHome: backHome,
//         })
//       }
//     },

//     __isLryj() {
//       if (this.$data.$$ismini) {
//         if (this.$route.query.from === 'yjdz') {
//           this.$data.isLryj = false
//         } else {
//           this.$data.isLryj = true
//         }
//         window.sessionStorage.setItem('isLryj', this.$data.isLryj)
//         console.log('isLryj: ', this.$data.isLryj)
//       }
//     },
//     __getPagePid() {
//       if (this.$data.$$ismini) {
//         return this.$route.query.pid || null
//       } else {
//         return getPagePid()
//       }
//     },
//     __getPageName() {
//       if (this.$data.$$ismini) {
//         return this.$route.query.pname || null
//       } else {
//         return getPageName()
//       }
//     },
//     __setPageEndPid(pageEndParams) {
//       if (this.$data.$$ismini) {
//         wx.miniProgram.postMessage({
//           data: {
//             pageEndParams,
//           },
//         })
//       } else {
//         setPageEndPid(pageEndParams)
//       }
//     },
//   },

//   async mounted() {
//     this.$data.$$ismini = await this.__miniComputed()
//     this.__isLryj()
//   },
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

// export default nativeMixin
