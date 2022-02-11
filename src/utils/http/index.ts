import Vue from 'vue'
import axios from './interceptors'
import { Toast } from "vant";
import { goLogin } from '../../common/hybridUtils';
const CancelToken = axios.CancelToken;
// 可调用方法
const METHODS = ["POST", "GET"];
let apiCount = 0; // 调用请求次数
let cancelAjaxArray:any[] = []; // 待取消接口请求数组

// 默认配置
const originalApiOption = {
    showLoading: false, // 接口是否显示loading
    version: 2, // 接口调用版本号 默认v2
    delay: 0, // 接口延迟调用
    method: "POST", // 接口调用方法
    headers: {}, // 自定义请求头
    chainStart: false, // 链式调用开头
    chainFinish: false, // 链式调用结尾
    effectMainProcess: false, // 是否关键请求 异常跳错误页
    isPT: false,
    isDV: false,
    isTraining: false
}
function setToken(key : keyof typeof headers,token:string | null,headers:any):void{
    headers[key] = token  
}
/**
 * 可配置 loading 的 axios 的接口调用
 */
export const getResponse = (url:string | null = null, params = {}, customOptions = {}) => {
    const apiOptions = Object.assign({}, originalApiOption, customOptions);
    if (!url) {
        apiCount = 0;
        Toast.clear();
        return Promise.reject('error');
    }
    if (apiOptions.showLoading && apiOptions.chainStart) apiCount++;
    if (apiOptions.showLoading) {
        apiCount++;
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
    }
    let cancelToken = new CancelToken(function executor(c){
        //这个executor 函数接受一个cancel function作为参数
        cancelAjaxArray.push(c);
    });
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            const token = window.sessionStorage.getItem('token')
            const isNgw = window.sessionStorage.getItem('isNgw')
            const ismini = window.sessionStorage.getItem('ismini')
            const isLryj = window.sessionStorage.getItem('isLryj')
            console.log('token, isNgw, ismini, isLryj :>> ', token, isNgw, ismini, isLryj);
            if (apiOptions.isPT) {
                axios.defaults.baseURL = apiOptions.version === 2 ? import.meta.env.VITE_APP_API_BASEPTURL2 as string : import.meta.env.VITE_APP_API_BASEPTURL3 as string;
            } else if(apiOptions.isDV) {
                axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASEDVURL as string;
            } else if (apiOptions.isTraining) {
                axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASETRAININGURL as string;
            } else if (isNgw) {
                setToken('x-authorization',token,apiOptions.headers)
                axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASEURL as string;
            } else {
                axios.defaults.baseURL = apiOptions.version === 2 ? import.meta.env.VITE_APP_API_BASEURL2 as string : import.meta.env.VITE_APP_API_BASEURL3 as string;
            }
            if (METHODS.includes(apiOptions.method.toUpperCase())) {
                const httpMethod = apiOptions.method && apiOptions.method.toLowerCase() || "post";
                if (httpMethod === 'get') {
                    axios.get(url, {
                        cancelToken,
                        params: params,
                        headers: JSON.stringify(apiOptions.headers) === "{}" ? undefined : apiOptions.headers
                    }).then(res=> {
                        if (apiOptions.showLoading && apiOptions.chainFinish) apiCount--;
                        if (apiOptions.showLoading) {
                            apiCount--;
                            if (!apiCount) Toast.clear();
                        }
                        if((<any>res).code === 401) {
                            if (ismini) {
                                const url = isLryj ? '/v3/authorized/pages/guide/index' : '/subpackages/auth/guidePage/guidePage'
                                window.wx.miniProgram.navigateTo({ url })
                            } else {
                                goLogin({
                                    refresh: true
                                })
                            }
                        }
                        resolve(res);
                    }, res => {
                        if (apiOptions.showLoading && apiOptions.chainFinish) apiCount--;
                        if (apiOptions.showLoading) {
                            apiCount--;
                            if (!apiCount) Toast.clear();
                        }
                        reject(res)
                    })
                } else {
                    axios.post(url, params, {
                        cancelToken,
                        headers: JSON.stringify(apiOptions.headers) === "{}" ? undefined : apiOptions.headers
                    }).then(res => {
                        if (apiOptions.showLoading && apiOptions.chainFinish) apiCount--;
                        if (apiOptions.showLoading) {
                            apiCount--;
                            if (!apiCount) Toast.clear();
                        }
                        if((<any>res).code.code === 401) {
                            if (ismini) {
                                const url = isLryj ? '/v3/authorized/pages/guide/index' : '/subpackages/auth/guidePage/guidePage'
                                window.wx.miniProgram.navigateTo({ url })
                            } else {
                                goLogin({
                                    refresh: true
                                })
                            }
                        }
                        resolve(res);
                    }, res => {
                        if (apiOptions.showLoading && apiOptions.chainFinish) apiCount--;
                        if (apiOptions.showLoading) {
                            apiCount--;
                            if (!apiCount) Toast.clear();
                        }
                        reject(res)
                    })
                }
			} else {
				reject(
					JSON.stringify({
						url,
						msg: `不支持该方法调用====>${apiOptions.method}`,
						params,
						apiOptions
					})
				)
			}
        }, apiOptions.delay)
    }).catch(e => {
            // 主接口异常 取消其他接口请求
            for(let cancelFun of cancelAjaxArray) {
                if (cancelFun && typeof cancelFun === 'function') {
                    cancelFun();
                }
            }
            console.log('跳转错误页');
    })
};
