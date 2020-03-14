## 描述
一个webpack的loader，目的在于解决多个小程序平台 api 调用不同，而维护多份代码，或者维护多个小程序平台的调用。以微信小程序平台语法为标准，通过 babel 去编译出不同环境的代码。

## 技术相关
* webpack 自定义loader开发
* babel：操作AST转换。

## 目前项目支持情况

| api/平台 | 说明 | 微信小程序 | 支付宝小程序 |
| --- | --- | --- | --- |
| request | 发起 HTTPS 网络请求 | √ | √ |
| getStorage | 从本地缓存中异步获取指定 key 的内容 | | 
| getStorageSync | wx.getStorage 的同步版本 |  |  |  |
| setStorage | 将数据存储在本地缓存中指定的 key 中 | | | |
| getStorageSync | wx.setStorage 的同步版本 |  |  |  |
