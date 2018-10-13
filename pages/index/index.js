//index.js
//获取应用实例
const app = getApp()
var flag = true;
//var myData;
Page({
  data: {
    motto: '梦醒健身',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  //事件处理函数
  scancode:function(e){
    var show;
    console.log('测试'+app.globalData.openId)
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: (res) => {
        console.log("path," + res.path)
        console.log("result," + res.result)
        console.log("scanType," + res.scanType)
        this.show = res.result;
        this.setData({
          show: this.show
        })
        wx.navigateTo({
          url: '../RT_display/RT_display',
        })
      },
      fail: () => {
        console.log("fail")
      },
      complete: () => {
        console.log("complete")
      }
    })
  },

  getHistory:function(){
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType == 'none') {
          wx.showToast({
            title: '没连接网络',
            duration: 1000,
          })
          wx.vibrateLong({})
        }
        else{
          wx.navigateTo({
            url: '../history_display/display',
          })
        }
      }
    })
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    //var flag=false;

    


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        if (networkType == 'none') {
          wx.showToast({
            title: '没连接网络',
            duration: 1000,
          })
          wx.vibrateLong({})
        }
        /*else {
          wx.connectSocket({
            url: 'wss://vqjdz3e0.ws.qcloud.la',
            //method: "GET"
          })

          wx.onSocketClose(function (res) {
            //var that = this;
            // clearInterval(i); 
            console.log('WebSocket 已关闭！')
            flag = true;
            if (flag) {
              var i = setInterval(function () {
                console.log('进入定时器')
                if (flag == false) {
                  clearInterval(i);
                  console.log('关闭定时器')
                }
                else {
                  wx.connectSocket({
                    url: 'wss://vqjdz3e0.ws.qcloud.la',
                    success: function () {
                      console.log('重连')
                    }
                  })
                }
              }, 1000)
              /*wx.connectSocket({
                url: 'wss://vqjdz3e0.ws.qcloud.la',
                header: {
                  'contentType': "application/x-www-form-urlencoded;charset=utf-8"
                },
                success: function () {
                  console.log('第一步重连')
                }
              })* /
            }
          })

        }*/
      }
    })
   // wx.onSocketError(function (res) {
   //   console.log('WebSocket连接打开失败，请检查！')
   // })

  },
  

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },

  onShow:function(){
  
   /* wx.onSocketOpen(function () {
      flag = false;
      console.log('连接成功'+flag)
    })
    if(flag){
      wx.connectSocket({
        url: 'wss://vqjdz3e0.ws.qcloud.la',
        success: function () {
          console.log('重连')
        }
      })
    }
    wx.onSocketMessage(function (res) {
      app.globalData.myData = res;
      console.log('收到服务器内容：' + res.data);
      console.log(app.globalData.myData);
    })*/
    console.log('show')
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
