import dsBridge from 'dsbridge'
/**
 * 获取 DSBridge 全局命名空间
 */
export const getNameSpace = () => {
  let nameSpace = ''
  if (dsBridge.hasNativeMethod('getNameSpace')) {
    nameSpace = dsBridge.call('getNameSpace')
    if (nameSpace) {
      nameSpace = nameSpace + '.'
      console.log(`getNameSpace获取到的nameSpace========>${nameSpace}`)
    } else {
      nameSpace = nameSpace + ''
      console.log(`getNameSpace获取到的nameSpace========>${nameSpace}`)
    }
  } else {
    console.error(`getNameSpace调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return nameSpace
}

/**
 * 获取用户详细信息
 */
export const getUserInfo = () => {
  const nameSpace = getNameSpace()
  let userInfo, userInfoObj
  if (dsBridge.hasNativeMethod(`${nameSpace}getUserInfo`)) {
    userInfo = dsBridge.call(`${nameSpace}getUserInfo`)
    if (userInfo) {
      userInfoObj = JSON.parse(userInfo)
    }
    console.log(`${nameSpace}getUserInfo获取到的数据========>${userInfo}`)
  } else {
    userInfoObj = null
    console.error(`${nameSpace}getUserInfo调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return userInfoObj
}
// 获取永辉优惠兑换码
export const setClipboardData = (data: any) => {
  const nameSpace = getNameSpace()
  let clipboardData = ''
  if (dsBridge.hasNativeMethod(`${nameSpace}setClipboardData`)) {
    clipboardData = dsBridge.call(`${nameSpace}setClipboardData`, data)
    console.log(`${nameSpace}getSetClipboardData获取到的数据========>${clipboardData}`)
  } else {
    console.error(
      `${nameSpace}getSetClipboardData调用异常========>未在原生端调用或原生未注册该方法`,
    )
  }
  return clipboardData
}

/**
 * 获取Uid
 */
export const getUid = function (isObj = false) {
  const nameSpace = getNameSpace()
  let token, uid
  if (dsBridge.hasNativeMethod(`${nameSpace}getToken`)) {
    token = dsBridge.call(`${nameSpace}getToken`)
    console.log(`${nameSpace}getToken获取到的uid========>${token}`)
  } else {
    token = null
    console.error(`${nameSpace}getToken调用异常========>未在原生端调用或原生未注册该方法`)
  }
  if (dsBridge.hasNativeMethod(`${nameSpace}getUid`)) {
    uid = dsBridge.call(`${nameSpace}getUid`)
    console.log(`${nameSpace}getUid获取到的uid========>${uid}`)
  } else {
    uid = null
    console.error(`${nameSpace}.getUid调用异常========>未在原生端调用或原生未注册该方法`)
  }
  if (isObj) {
    return { uid, token }
  } else {
    return uid
  }
}

/**
 * 获取版本号
 */
export function getCurrAppVersion() {
  const nameSpace = getNameSpace()
  let version
  if (dsBridge.hasNativeMethod(`${nameSpace}getCurrAppVersion`)) {
    version = dsBridge.call(`${nameSpace}getCurrAppVersion`)
    console.log(`${nameSpace}getCurrAppVersion获取到的version========>${version}`)
  } else {
    version = null
    console.error(`${nameSpace}getCurrAppVersion========>未在原生端调用或原生未注册该方法`)
  }
  return version
}

/**
 * 获取版本号
 */
export function getAppVersion() {
  const nameSpace = getNameSpace()
  let version
  if (dsBridge.hasNativeMethod(`${nameSpace}getVersion`)) {
    version = dsBridge.call(`${nameSpace}getVersion`)
    console.log(`${nameSpace}getVersion========>${version}`)
  } else {
    version = null
    console.error(`${nameSpace}getVersion========>未在原生端调用或原生未注册该方法`)
  }
  return version
}

/**
 * 获取是否新网关
 */
export function getIsNgw() {
  const nameSpace = getNameSpace()
  let isNgw
  if (dsBridge.hasNativeMethod(`${nameSpace}isNgw`)) {
    isNgw = dsBridge.call(`${nameSpace}isNgw`)
    console.log(`${nameSpace}isNgw========>${isNgw}`)
  } else {
    isNgw = null
    console.error(`${nameSpace}isNgw========>未在原生端调用或原生未注册该方法`)
  }
  return isNgw
}

/**
 * 获取Json数据
 */
export const getJson = function () {
  const nameSpace = getNameSpace()
  let jsonStr
  if (dsBridge.hasNativeMethod(`${nameSpace}getJson`)) {
    jsonStr = dsBridge.call(`${nameSpace}getJson`)
    console.log(`${nameSpace}getJson获取到的json========>${jsonStr}`)
  } else {
    jsonStr = null
    console.error(`${nameSpace}getJson调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return jsonStr
}

/**
 * 立即分享
 */
export const shareOnce = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}shareOnce`)) {
    dsBridge.call(`${nameSpace}shareOnce`)
  } else {
    callResult = false
    console.error(`${nameSpace}shareOnce调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 设置标题
 */
export const setTitle = function (title: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}setTitle`)) {
    dsBridge.call(`${nameSpace}setTitle`, title)
  } else {
    callResult = false
    console.error(`${nameSpace}setTitle调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/**
 * 向移动端传参
 */
export const setParams = function (funcName: any, params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}${funcName}`)) {
    dsBridge.call(`${nameSpace}${funcName}`, JSON.stringify(params))
  } else {
    callResult = false
    console.error(`${nameSpace}setParams调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/**
 * app分享可配置
 * isShowWeFriend 是否展示发送微信好友
 * isShowWeCircle 是否展示发送微信朋友圈
 * isShowQQFriend 是否展示发送qq好友
 * isShowQzone 是否展示发送qq空间
 */
export const shareMethod = function (options: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (typeof options === 'object' && options instanceof Object) {
    let optionsStr = JSON.stringify(options)
    if (dsBridge.hasNativeMethod(`${nameSpace}shareMethod`)) {
      console.log(`${nameSpace}shareMethod入参========>${optionsStr}`)
      dsBridge.call(`${nameSpace}shareMethod`, optionsStr)
    } else {
      callResult = false
      console.error(`${nameSpace}shareMethod调用异常========>未在原生端调用或原生未注册该方法`)
    }
  } else {
    callResult = false
    console.error(`${nameSpace}shareMethod调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 右上分享
 * isShowNativeShare:Boolean
 * @param {} options
 */
export const onNativeShareClick = function (options: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (typeof options === 'object' && options instanceof Object) {
    let optionsStr = JSON.stringify(options)
    if (dsBridge.hasNativeMethod(`${nameSpace}onNativeShareClick`)) {
      console.log(`${nameSpace}onNativeShareClick入参========>${optionsStr}`)
      dsBridge.call(`${nameSpace}onNativeShareClick`, optionsStr)
    } else {
      callResult = false
      console.error(
        `${nameSpace}onNativeShareClick调用异常========>未在原生端调用或原生未注册该方法`,
      )
    }
  } else {
    callResult = false
    console.error(`${nameSpace}onNativeShareClick调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/**
 * 设置导航栏背景色及字体颜色
 * navigationColor: 背景色 默认 #ffffff
 * titleColor: 字体颜色 默认 #303030
 * theme: 主题色 white black 默认 white
 */
export const setStatusBarColor = function (options: any) {
  let callResult = true
  const defaultOpt = {
    navigationColor: '#ffffff',
    titleColor: '#303030',
    theme: 'white',
  }
  const nameSpace = getNameSpace()
  options = Object.assign(defaultOpt, options)
  console.log(options)
  if (typeof options === 'object' && options instanceof Object) {
    let optionsStr = JSON.stringify(options)
    if (dsBridge.hasNativeMethod(`${nameSpace}setStatusBarColor`)) {
      console.log(`${nameSpace}setStatusBarColor入参========>${optionsStr}`)
      dsBridge.call(`${nameSpace}setStatusBarColor`, optionsStr)
    } else {
      callResult = false
      console.error(
        `${nameSpace}setStatusBarColor调用异常========>未在原生端调用或原生未注册该方法`,
      )
    }
  } else {
    callResult = false
    console.error(`${nameSpace}setStatusBarColor调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 立即分享
 */
export const bannerShareOnce = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}bannerShareOnce`)) {
    dsBridge.call(`${nameSpace}bannerShareOnce`)
  } else {
    callResult = false
    console.error(`${nameSpace}bannerShareOnce调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 点击去约课
 */
export const appointmentClass = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}appointmentClass`)) {
    dsBridge.call(`${nameSpace}appointmentClass`)
  } else {
    callResult = false
    console.error(`${nameSpace}appointmentClass调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 返回上一页
 */
export const goBack = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}goBack`)) {
    dsBridge.call(`${nameSpace}goBack`)
  } else {
    callResult = false
    console.error(`${nameSpace}goBack调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 返回首页
 */
export const goHome = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}goHome`)) {
    dsBridge.call(`${nameSpace}goHome`)
  } else {
    callResult = false
    console.error(`${nameSpace}goHome调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 去订单列表
 * * refresh 是否刷新 Boolean(非必传)
 */
export const goOrderList = function (params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}goOrderList`)) {
    let paramStr = JSON.stringify(Object.assign({}, { refresh: true }, params))
    dsBridge.call(`${nameSpace}goOrderList`, paramStr)
  } else {
    callResult = false
    console.error(`${nameSpace}goOrderList调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 去登陆
 * @augments {[refresh]} 是否刷新
 */
export const goLogin = function (params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  const customParams = Object.assign(
    {},
    {
      refresh: false,
    },
    params,
  )
  let paymentParamsStr = JSON.stringify(customParams)
  if (dsBridge.hasNativeMethod(`${nameSpace}goLogin`)) {
    dsBridge.call(`${nameSpace}goLogin`, paymentParamsStr)
  } else {
    callResult = false
    console.error(`${nameSpace}goLogin调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 去购买私教课
 */
export const onGetCoachClick = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}onGetCoachClick`)) {
    dsBridge.call(`${nameSpace}onGetCoachClick`)
  } else {
    callResult = false
    console.error(`${nameSpace}onGetCoachClick调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 点击去购买医健课
 */
export const onGetDoctorClick = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}onGetDoctorClick`)) {
    dsBridge.call(`${nameSpace}onGetDoctorClick`)
  } else {
    callResult = false
    console.error(`${nameSpace}onGetDoctorClick调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 点击去购买团操列表
 */
export const onGetGroupClick = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}onGetGroupClick`)) {
    dsBridge.call(`${nameSpace}onGetGroupClick`)
  } else {
    callResult = false
    console.error(`${nameSpace}onGetGroupClick========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/**
 * 点击去购买团操列表 带参数版
 */
export const onGetGroupClickParams = function (params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}onGetGroupClickParams`)) {
    let groupParams = JSON.stringify(params)
    dsBridge.call(`${nameSpace}onGetGroupClickParams`, groupParams)
  } else {
    callResult = false
    console.error(`${nameSpace}onGetGroupClickParams========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/**
 * 点击去购买医健课
 */
export const toPhoneService = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}toPhoneService`)) {
    dsBridge.call(`${nameSpace}toPhoneService`)
  } else {
    callResult = false
    console.error(`${nameSpace}toPhoneService调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 点击跳转购买医健列表
 */
export const toDoctorList = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}toDoctorList`)) {
    dsBridge.call(`${nameSpace}toDoctorList`)
  } else {
    callResult = false
    console.error(`${nameSpace}toDoctorList========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 点击跳转购买医健介绍
 */
export const toCoachOrDocIntro = function (params: any) {
  let data = {
    labelCode: 10,
  }
  let paramStr = JSON.stringify(Object.assign(data, params))
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}toCoachOrDocIntro`)) {
    dsBridge.call(`${nameSpace}toCoachOrDocIntro`, paramStr)
  } else {
    callResult = false
    console.error(`${nameSpace}toCoachOrDocIntro========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 点击去购买医健课
 */
export const toCustomerService = function () {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}toCustomerService`)) {
    dsBridge.call(`${nameSpace}toCustomerService`)
  } else {
    callResult = false
    console.error(`${nameSpace}toCustomerService调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 调用原生收银台
 * @param {支付所需入参} params
 * orderNum 订单编号 String
 * price 支付价格 Double
 * costBalance 优惠价格 Double
 * remainingSeconds 倒计时 Int
 * type 类型 Int
 * refresh 是否刷新 Boolean(非必传)
 * flag 标志位 String (非必传)
 */
export const payment = function (params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  let paymentParamsStr
  if (typeof params === 'object' && params instanceof Object) {
    paymentParamsStr = JSON.stringify(params)
    if (dsBridge.hasNativeMethod(`${nameSpace}payment`)) {
      console.log(`${nameSpace}payment入参========>${paymentParamsStr}`)
      dsBridge.call(`${nameSpace}payment`, paymentParamsStr)
    } else {
      callResult = false
      console.error(`${nameSpace}payment调用异常========>未在原生端调用或原生未注册该方法`)
    }
  } else {
    callResult = false
    console.error(`${nameSpace}payment调用异常（参数有误）========>${paymentParamsStr}`)
  }
  return callResult
}

/**
 * 跳转支付成功页面
 * @param {支付成功参数} params
 * orderNum 订单编号 String
 * price 支付价格 Double
 * payType 支付类型 Int
 * type 类型 Int
 */
export const toOrderResult = function (params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  let orderParamsStr
  if (typeof params === 'object' && params instanceof Object) {
    orderParamsStr = JSON.stringify(params)
    if (dsBridge.hasNativeMethod(`${nameSpace}toOrderResult`)) {
      console.log(`${nameSpace}toOrderResult入参========>${orderParamsStr}`)
      dsBridge.call(`${nameSpace}toOrderResult`, orderParamsStr)
    } else {
      callResult = false
      console.error(`${nameSpace}toOrderResult调用异常========>未在原生端调用或原生未注册该方法`)
    }
  } else {
    callResult = false
    console.error(`${nameSpace}toOrderResult调用异常（参数有误）========>${orderParamsStr}`)
  }
  return callResult
}

/**
 * 跳转教练主页
 */
export const toCoachDetail = function (cid: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}toCoachDetail`)) {
    dsBridge.call(`${nameSpace}toCoachDetail`, cid)
  } else {
    callResult = false
    console.error(`${nameSpace}toCoachDetail调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/**
 * 向app发送业务数据
 * @param {*} ename
 * @param {*} business
 */
export const trackData = function (pname: any, ename: any, business: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}trackData`)) {
    const data = {
      ename: ename || '',
      b: business instanceof Object ? JSON.stringify(business) : JSON.stringify({}),
      pname: pname || '',
    }
    dsBridge.call(`${nameSpace}trackData`, JSON.stringify(data))
  } else {
    callResult = false
    console.error(`${nameSpace}trackData调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/** 获取定位信息 */
export function getLocation() {
  const nameSpace = getNameSpace()
  let location
  if (dsBridge.hasNativeMethod(`${nameSpace}getLocation`)) {
    location = dsBridge.call(`${nameSpace}getLocation`)
    console.log(`${nameSpace}getLocation获取到的location========>${location}`)
  } else {
    location = null
    console.error(`${nameSpace}getLocation调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return location
}

/** 跳转小程序 */
export function openAssistant(options: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (typeof options === 'object' && options instanceof Object) {
    let optionsStr = JSON.stringify(options)
    if (dsBridge.hasNativeMethod(`${nameSpace}openAssistant`)) {
      console.log(`${nameSpace}openAssistant========>${optionsStr}`)
      dsBridge.call(`${nameSpace}openAssistant`, optionsStr)
    } else {
      callResult = false
      console.error(`${nameSpace}openAssistant调用异常========>未在原生端调用或原生未注册该方法`)
    }
  } else {
    callResult = false
    console.error(`${nameSpace}openAssistant调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/** 跳转小程序 */
export function openWXMini(options: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (typeof options === 'object' && options instanceof Object) {
    let optionsStr = JSON.stringify(options)
    if (dsBridge.hasNativeMethod(`${nameSpace}openWXMini`)) {
      console.log(`${nameSpace}openWXMini========>${optionsStr}`)
      dsBridge.call(`${nameSpace}openWXMini`, optionsStr)
    } else {
      callResult = false
      console.error(`${nameSpace}openWXMini调用异常========>未在原生端调用或原生未注册该方法`)
    }
  } else {
    callResult = false
    console.error(`${nameSpace}openWXMini调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/** 私教新人福利 */
export function buyTrailCourse() {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}buyTrailCourse`)) {
    dsBridge.call(`${nameSpace}buyTrailCourse`)
  } else {
    callResult = false
    console.error(`${nameSpace}buyTrailCourse调用异常========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/** 跳小班课地址 */
export function toTutorialList() {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}toTutorialList`)) {
    dsBridge.call(`${nameSpace}toTutorialList`)
  } else {
    callResult = false
    console.error(`${nameSpace}toTutorialList========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/** 跳小班课地址带参数 */
export function toTutorialListParams(params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}toTutorialListParams`)) {
    let paramStr = JSON.stringify(Object.assign({}, params))
    dsBridge.call(`${nameSpace}toTutorialListParams`, paramStr)
  } else {
    callResult = false
    console.error(`${nameSpace}toTutorialListParams========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}

/** 跳转优惠券列表 */
export function onGetCouponListClick(params: any) {
  let callResult = true
  const nameSpace = getNameSpace()
  if (dsBridge.hasNativeMethod(`${nameSpace}onGetCouponListClick`)) {
    let paramStr = JSON.stringify(Object.assign({}, params))
    dsBridge.call(`${nameSpace}onGetCouponListClick`, paramStr)
  } else {
    callResult = false
    console.error(`${nameSpace}onGetCouponListClick========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/** 获取pid */
export function getPagePid() {
  let callResult
  const nameSpace = 'H5JavaScriptMode'
  if (dsBridge.hasNativeMethod(`${nameSpace}.getPagePid`)) {
    callResult = dsBridge.call(`${nameSpace}.getPagePid`)
  } else {
    callResult = null
    console.error(`${nameSpace}.getPagePid========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/** 获取pid */
export function getPageName() {
  let callResult
  const nameSpace = 'H5JavaScriptMode'
  if (dsBridge.hasNativeMethod(`${nameSpace}.getPageName`)) {
    callResult = dsBridge.call(`${nameSpace}.getPageName`)
  } else {
    callResult = null
    console.error(`${nameSpace}.getPageName========>未在原生端调用或原生未注册该方法`)
  }
  return callResult
}
/** 传pid到移动端 */
export function setPageEndPid(params: any) {
  let callResult = true
  const nameSpace = 'H5JavaScriptMode'
  if (dsBridge.hasNativeMethod(`${nameSpace}.setPageEndPid`)) {
    let paramStr = JSON.stringify(Object.assign({}, params))
    dsBridge.call(`${nameSpace}.setPageEndPid`, paramStr)
  } else {
    callResult = false
    console.error(`${nameSpace}.setPageEndPid========>未在原生端调用或原生未注册该方法`)
  }
}
