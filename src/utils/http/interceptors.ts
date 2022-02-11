import axios from 'axios'

// axios 配置
axios.defaults.timeout = 20000;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        try {
            if (response.config.baseURL && response.config.baseURL.includes('/training')) {
                console.log(response)
            }
        } catch (error) {
            console.error('error', error)
        }
        return response.data;
    },
    error => {
        return Promise.reject(error.message)
    });

export default axios;
