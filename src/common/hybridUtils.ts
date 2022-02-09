import dsBridge from 'dsbridge';
/**
 * 获取 DSBridge 全局命名空间
 */
 export const getNameSpace = ()=> {
    let nameSpace = '';
    if (dsBridge.hasNativeMethod('getNameSpace')) {
        nameSpace = dsBridge.call("getNameSpace");
        if (nameSpace) {
            nameSpace = nameSpace + '.';
            console.log(`getNameSpace获取到的nameSpace========>${nameSpace}`)
        } else {
            nameSpace = nameSpace + '';
            console.log(`getNameSpace获取到的nameSpace========>${nameSpace}`)
        }
    } else {
        console.error(`getNameSpace调用异常========>未在原生端调用或原生未注册该方法`);
    }
    return nameSpace;
}

/**
 * 获取用户详细信息
 */
 export const getUserInfo = ()=> {
     console.log('执行此函数');
     
    const nameSpace = getNameSpace();
    let userInfo, userInfoObj;
    if (dsBridge.hasNativeMethod(`${nameSpace}getUserInfo`)) {
        userInfo = dsBridge.call(`${nameSpace}getUserInfo`);
        if (userInfo) {
            userInfoObj = JSON.parse(userInfo);
        }
        console.log(`${nameSpace}getUserInfo获取到的数据========>${userInfo}`)
    } else {
        userInfoObj = null;
        console.error(`${nameSpace}getUserInfo调用异常========>未在原生端调用或原生未注册该方法`);
    }
    return userInfoObj;
}