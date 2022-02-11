import LYDataHelper from './helper'
import LYDataConfig from './config'
import LYDataGlobal from './global'
import qs from 'qs'
import axios from 'axios'
import { useUserStore } from '@/store'

//初始化未生成需要异步调用
let userStore: any
setTimeout(() => {
  userStore = useUserStore()
}, 0)

class LYDataCore {
  version = '' // 当前版本

  platform = '' // 源头

  api = '' // 接口

  sessionId = '' // 会话id

  sendLaunch = false // 是否发送launch_view

  helper = {}

  global = {}

  constructor() {
    this.version = LYDataConfig.version
    this.platform = LYDataConfig.platform
    this.api = LYDataConfig.api
    this.sessionId = LYDataHelper.getUUID()
  }

  launch() {
    const query = qs.parse(window.location.search)
    // 随创建发送launch_view事件
    this.report(
      'launch_view',
      {
        platform_type: LYDataGlobal.platform_type,
        platform_version: LYDataGlobal.platform_version,
        os_type: LYDataGlobal.os_type,
        os_version: LYDataGlobal.os_version,
        model: LYDataGlobal.brand,
        screen_heihgt: LYDataGlobal.screen_heihgt,
        screen_width: LYDataGlobal.screen_width,
        promotion_channel: query ? query.channel : '',
      },
      window.location.href,
    )
    this.sendLaunch = true
  }

  // 请求
  async ajax(data: any) {
    const _data = {
      c: data.c,
      p: data.p,
      b: data.b,
    }
    if (_data.p.hasOwnProperty('ename')) {
      delete _data.p.ename
    }
    if (_data.b.hasOwnProperty('ename')) {
      delete _data.b.ename
    }

    axios.post(this.api, {
      data: [_data],
    })
  }

  // 获取公共信息
  getCommonInfo(args: any) {
    return {
      eid: LYDataHelper.randomEventID(), // 事件ID
      etime: Date.now(), // 获取当前时间戳
      src: this.platform, // 平台
      device_id: LYDataHelper.getDeviceID(), // 设备id
      uid: userStore.uid,
    }
  }

  // 获取页面信息
  getCurrentPageInfo(args: any) {
    const lyPageInfo = LYDataHelper.getCurrentPageLYDataInfo()
    return {
      pname: (args && args.pname) || location.href || '', // 当前页面名称
      pid: lyPageInfo[LYDataHelper.Page_ID_KEY] || LYDataHelper.getUUID(), // UUID, 每次进入新页面时生成 可用于全链路追踪 全称page_id
      sid: this.sessionId,
    }
  }

  // 数据上报
  report(ename: any, args: any, pname: any) {
    // 不上报
    if (!LYDataConfig.switch) {
      return
    }
    const common = this.getCommonInfo(args)
    const page = this.getCurrentPageInfo(args)
    pname = pname || page.pname
    const json = LYDataHelper.composeLYData(ename, common, page, args, pname)
    this.ajax(json)
  }
}

export default new LYDataCore()
