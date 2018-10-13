//app.js
const request = require('./pages/connect/http.js')
const websocket = require('./pages/connect/websocket.js')
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      
      success: res => {

        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe7e77350dc2cc008&secret=80bc694f35a1ac4141e9b2726264a488&js_code=' + res.code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
            },
            success:function(res){ 
              getApp().globalData.openId=res.data.openid;
              console.log('数据' + JSON.stringify(getApp().globalData.openId))
              console.log('数据' + JSON.stringify(res))
            }
          })
          console.log('code":' + JSON.stringify(res))
        } else {
          console.log('登录失败！' + res.errMsg)
        }

        //console.log('code":'+res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            //withCredentials:true,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    myData:null,
    openId:null
  }
})