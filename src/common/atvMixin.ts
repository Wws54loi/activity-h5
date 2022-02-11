import { __payment, __goOrderList, __hasNativeMethod, __goLogin, __openWXMini } from './nativeMixin'
import { onNativeShareClick, shareMethod } from './hybridUtils'
import { useUserStore, useClientStore } from '@/store'
import { getResponse } from '@/utils/http'
import { Toast, Dialog } from 'vant'

export let __atv__: any = null //活动对象
export let shareInfo: any = null //分享详情
export let posterDate: any = null //海报信息

// 是否购买过
export const __atv_join__ = () => {
  let status = false
  if (__atv__) {
    status = __atv__.joinStatus
  }
  return status
}

//     // 活动状态，0-已过期（下架），1-已开始, 2-未开始, 3-未上架
export const __atv_status__ = () => {
  if (__atv__) {
    return __atv__.activityStatus
  } else {
    return 3
  }
}

// 限制参与人数
export const __atv_limit__ = () => {
  if (__atv__ && __atv__.joinLimit >= 0) {
    return __atv__.joinLimit
  } else {
    return 100
  }
}
//     // 剩余数量
export const __atv_remain__ = () => {
  if (__atv__ && __atv__.remain >= 0) {
    return __atv__.remain
  } else {
    return 100
  }
}

//     // 价格
export const __atv_price__ = () => {
  if (__atv__ && __atv__.totalPrice) {
    return __atv__.totalPrice
  } else {
    return 0
  }
}

//     // 是否是新用户
export const __atv_isold__ = () => {
  if (__atv__ && __atv__.isOld) {
    return __atv__.isOld
  } else {
    return false
  }
}

//     // 判断地理位置是否在深圳
export const __atv_sites__ = async () => {
  const userStore = await useUserStore()
  if (userStore.location && userStore.location.cityId + '' === '440300000000') {
    return true
  } else {
    return false
  }
}
//     // 活动校验 判断活动是否有效
export const _atv_check_ = async (options: any, config = { toast: true }) => {
  try {
    const res: any = await getResponse(
      '/activity/verify',
      {
        ...options,
      },
      { version: 3 },
    )
    if (res && res.code === 0) {
      console.log('活动校验', res)
      __atv__ = res.data || {}
    } else if (res && res.code !== 0) {
      if (config.toast) {
        Toast(res.msg || '服务器繁忙，请稍候再试')
      }
    }
  } catch (error) {
    console.error(error)
    if (config.toast) {
      Toast('服务器繁忙，请稍候再试')
    }
  }
}

//     // 下单支付
export const _atv_book_ = async (options: any, config = { toast: true }) => {
  const res: any = await getResponse(
    '/lazyOrder/insertActivityOrder',
    {
      ...options,
    },
    { version: 3 },
  ).catch((err) => {
    console.error(err)
    if (config.toast) {
      Toast('服务器繁忙，请稍候再试')
    }
  })
  if (res && res.code === 0) {
    _atv_pay_(res.data)
  } else if (res && res.code === 7810) {
    const hasGoOrderListMethod = __hasNativeMethod('goOrderList')
    Dialog.confirm({
      title: '有未支付订单',
      message: `请在“我的-我的订单-待支付”中完成订单支付`,
      showCancelButton: Boolean(hasGoOrderListMethod),
      confirmButtonText: Boolean(hasGoOrderListMethod) ? '去支付' : '我知道了',
    }).then(() => {
      __goOrderList()
    })
  } else if (res && res.code !== 0) {
    if (config.toast) {
      Toast(res.msg || '服务器繁忙，请稍候再试')
    }
  }
}

//     // 支付
export const _atv_pay_ = (info: any) => {
  const { orderNum, price, courseOrderName } = info
  __payment({
    orderNum,
    price,
    orderName: courseOrderName || '',
  })
}

//     /**
//      * 右上角(单独)转发：页面中无跳转过渡页的分享
//      * @param {小程序路径} path
//      * @param {页卡标题} title
//      * @param {页卡图片} thumbUrl
//      * @param {是否需要app分享} appNative
//      */
export const _share_default_ = async (
  miniPath: string,
  title: string,
  thumbUrl = '',
  appNative = true,
) => {
  const wx = window.wx
  const clineStore = await useClientStore()
  const poster = {
    title: title || '',
    description: null,
    thumbUrl: thumbUrl || '',
    shareType: 'WXMINI',
    posterData: null,
    definedPhoto: null,
    h5Path: null,
    wxminiPath: miniPath,
    paramJson: null,
    limitShare: null,
  }
  if (clineStore.ismini) {
    wx.miniProgram.postMessage({
      data: {
        poster,
      },
    })
  } else {
    if (appNative) {
      onNativeShareClick({
        isShowNativeShare: true,
        isShowWeFriend: true,
        isShowWeCircle: false,
        isShowQQFriend: false,
        isShowQzone: false,
        shareContent: [poster],
      })
    }
  }
}

//     /**
//      * H5活动页面-过渡页分享
//      * @param {String} _title 非必须：分享页的标题
//      * @param {Numbeer} _actId 活动唯一id/表id(ength:1~4)
//      * @param {String} _bgColor 非必须：分享页的背景颜色
//      * @returns H5页分享时调用，需跳转过渡页
//      */
export const _transition_share_ = async (_title = '分享', _actId: number, _bgColor = 'ffffff') => {
  const wx = window.wx
  const userStore = await useUserStore()
  const clientStore = await useClientStore()
  // 是否有uid
  if (userStore.uid) {
    Toast('请先登录~')
    __goLogin()
    return
  }

  // 是否传actId
  if (!_actId) {
    Toast('actId参数缺失')
    return
  } else {
    if (typeof _actId !== 'number') {
      console.log('_actId类型错误')
      return
    }
  }

  // 是否有shareInfo
  if (shareInfo === undefined) {
    console.log('shareInfo未找到')
    return
  }

  // 小程序环境跳转
  if (clientStore.ismini) {
    wx.miniProgram.navigateTo({
      url: `/v3/pages/public/activity-share/index?&actId=${_actId}&title=${_title}&bgColor=${_bgColor}`,
    })
  } else {
    // 原生环境跳转
    // 是否有分享信息
    if (!shareInfo) {
      await _getskip_shareinfo_(_actId)
    }
    shareMethod({
      isShowWeFriend: true,
      isShowWeCircle: true,
      isShowQQFriend: false,
      isShowQzone: false,
      shareContent: shareInfo,
    })
  }
}

//     /**
//      * H5活动页面-获取分享信息
//      * @param {Numbeer} _actId 活动唯一id/表id(ength:1~4)
//      * @returns 小程序右上角需要分享时，在进入页面时调用
//      */
export const _getskip_shareinfo_ = async (_actId: number) => {
  const wx = window.wx
  const userStore = await useUserStore()
  const clientStore = await useClientStore()
  // 是否有uid
  if (!userStore.uid) {
    Toast('请先登录~')
    __goLogin()
    return
  }
  // 是否传actId
  if (!_actId) {
    Toast('actId参数缺失')
    return
  } else {
    if (typeof _actId !== 'number') {
      console.log('_actId类型错误')
      return
    }
  }
  const res: any = await getResponse(
    '/activity/startBusiness/findShareActivityConfig',
    {
      activityId: _actId,
      uid: userStore.uid,
      shareUserType: 'USER',
    },
    { version: 3 },
  ).catch((err) => {
    Toast('服务器繁忙，请稍候再试')
  })
  if (res && res.code === 0) {
    shareInfo = res.data
    const poster = res.data.find((e: any) => e.shareType === 'WXMINI')
    posterDate = [poster]
    if (clientStore.ismini) {
      console.log('触发postmessage', poster)
      wx.miniProgram.postMessage({
        data: {
          poster,
        },
      })
    }
  } else if (res && res.code !== 0) {
    Toast(res.msg || '服务器繁忙，请稍候再试')
  }
}

//     /**
//      * H5活动页面-第三方微盟购买
//      * @param {Numbeer} _atvCode 活动校验码(length:14~)
//      * @returns
//      */
export const _thirdparty_buy_ = async (_atvCode: number) => {
  const userStore = await useUserStore()
  const clientStore = await useClientStore()
  // 是否有uid
  if (!userStore.uid) {
    Toast('请先登录~')
    __goLogin()
    return
  }

  // 是否传atvCode
  if (!_atvCode) {
    Toast('atvCode参数缺失')
    return
  } else {
    if (typeof _atvCode !== 'number') {
      console.log('_atvCode类型错误')
      return
    }
  }
  // 活动校验
  await _atv_check_({
    uid: userStore.uid,
    activityCode: _atvCode,
    cityId: userStore.location.cityId,
  })
  // 跳转微盟购买
  if (__atv__ && __atv__.extra) {
    const {
      appId,
      miniAppId,
      unitePath,
      generalPath, // 复杂情况下-路径地址
      miniPath, // 简单情况下-路径地址(默认)
    } = __atv__.extra
    if (appId && miniAppId) {
      let goPath = ''
      if (miniPath === undefined || miniPath === '') {
        goPath = generalPath
      } else {
        goPath = miniPath
      }
      __openWXMini(clientStore.ismini ? miniAppId : appId, goPath || '')
    }
  } else {
    // 判断活动是否过期
    if (!__atv__ || !__atv__.extra) {
      Toast('活动未上架或已过期')
    }
  }
}

//     /**
//      * 毫秒数格式化成日期时间
//      * @param {Number} strTime 时间戳(精确到秒的毫秒的都支持)
//      * @param {String} format nyrsfm:年月日时分秒，nyrsf：年月日时分，nyr:年月日，sfm：时分秒，默认：nyrsfm年月日时分秒
//      * @param {String} cutStr 分隔符：""空代表汉字分隔,"/","-"； 默认：-
//      * @param {Number} isAddZero 时间日期前面是否需要补0；默认：true
//      * @returns 返回格式：1111-01-01 10:20
//      */
//     formatTime: (strTime = '', format = 'nyrsfm', cutStr = '-', isAddZero = true) => {
//       let date
//       // strTime有值时
//       if (strTime) {
//         // 判断时间戳
//         if ((strTime + '').length >= 10 && (strTime + '').length <= 13) {
//           // 将10位数的时间戳转成13位数
//           strTime = (strTime + '').length !== 10 ? strTime : strTime * 1000
//           date = new Date(strTime * 1)
//         }
//       } else {
//         // strTime为空时
//         date = new Date()
//       }

//       let year = date.getFullYear() // 获取完整的年份
//       let month = date.getMonth() + 1 // 获取当前月份
//       let days = date.getDate() // 获取当前日
//       let hours = date.getHours() // 获取当前小时数
//       let minutes = date.getMinutes() // 获取当前分钟数
//       let seconds = date.getSeconds() // 获取当前秒数
//       // 时间加 0
//       if (isAddZero === true) {
//         let addZero = (time) => {
//           return time < 10 ? '0' + time : time + ''
//         }
//         month = addZero(date.getMonth() + 1) // 获取当前月份
//         days = addZero(date.getDate()) // 获取当前日
//         hours = addZero(date.getHours()) // 获取当前小时数
//         minutes = addZero(date.getMinutes()) // 获取当前分钟数
//         seconds = addZero(date.getSeconds()) // 获取当前秒数
//       }
//       // 使用空格分割format值
//       const formatArr = (format || 'nyrsf').split('')
//       let returnStr = ''
//       formatArr.forEach((e) => {
//         switch (e) {
//           case 'n':
//             returnStr += `${year}${cutStr === '' ? '年' : cutStr}`
//             break
//           case 'y':
//             returnStr += `${month}${cutStr === '' ? '月' : cutStr}`
//             break
//           case 'r':
//             returnStr += `${days}${cutStr === '' ? '日' : ''} `
//             break
//           case 's':
//             returnStr += `${hours}:`
//             break
//           case 'f':
//             returnStr += `${minutes}:`
//             break
//           case 'm':
//             returnStr += `${seconds}${'p'}` // 为了删除最后的冒号
//             break
//           default:
//             returnStr += ''
//             break
//         }
//       })
//       return returnStr.substr(0, returnStr.length - 1)
//     },

//     /**
//      * 是否禁止页面滚动条滚动
//      * @param {Boolean} isRoll
//      * @returns 默认：true禁用
//      * 服务端并没有document,需通过process.browser/process.server来判断
//      */
//     pageIsRoll(isRoll = true) {
//       if (!process.browser) return
//       let pageTouchMove = function (e) {
//         e.preventDefault()
//       }
//       if (isRoll === true) {
//         document.body.style.overflow = 'hidden'
//         document.addEventListener('touchmove', pageTouchMove, false) // 禁止页面滑动
//       } else {
//         document.body.style.overflow = '' //出现滚动条
//         document.removeEventListener('touchmove', pageTouchMove, false)
//       }
//     },
//   },
