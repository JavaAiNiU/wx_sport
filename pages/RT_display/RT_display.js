// pages/RT_display/RT_display.js

var charts = require('../../chart/wxcharts.js')
//var myData = require('../../pages/index/index.js')
var app=getApp()
var flag = true;
var status=false;
var time=0;
var i;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startSport:'开始运动'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://vqjdz3e0.qcloud.la',
      data: {
        openid: app.globalData.openId,
        status: 'check'
      },
      header: {
        'content-type': 'json'
      },
      method: "GET",
      success: function (res) {
        console.log('开始' + JSON.stringify(app.globalData.openId))
        console.log(JSON.stringify(res))
        if (res.errMsg == 'request:ok') {
          flag=false;
          that.setData({
            show: '正在运动中，请不要断开网络连接...',
            startSport: '暂停'
          })
        } else {
          that.setData({
            show: '连接失败，请重试.'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    flag=true;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //事件处理函数
  start:function(res){
    var that=this
  
    if(flag){
        this.setData({
          startSport: '暂停'
        })
        flag=false;
        status =true;
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                //withCredentials: true,
                success: res => {
                  wx.request({
                    url: 'https://vqjdz3e0.qcloud.la',
                    data: {
                      openid: app.globalData.openId,
                      status: 'start'
                    },
                    header: {
                      'content-type': 'json'
                    },
                    method: "POST",
                    success: function (res) {

                      console.log('开始' + JSON.stringify(app.globalData.openId))
                      console.log(JSON.stringify(res))
                      if (res.errMsg == 'request:ok') {
                        that.setData({
                          show: '正在运动中，请不要断开网络连接...'
                        })
                      } else {
                        that.setData({
                          show: '连接失败，请重试.'
                        })
                      }

                    }
                  })

                  // 可以将 res 发送给后台解码出 unionId
                  //console.log(res.encryptedData)
                  //console.log(res.iv)
                  ///this.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })
      i = setInterval(function () {
        time++
        console.log('进入定时器' + time)
      }, 1000)
    }
    else if(status){
      clearInterval(i);
      this.setData({
        startSport: '恢复运动',
        show:'已经运动 '+time +'\n如若继续请点击恢复运动，要结束本次运动请点击结束'
      })
      status=false;
    }
    else{
      this.setData({
        startSport: '暂停',
        show: '正在运动中，请不要断开网络连接...'
      })
      status=true;
      i = setInterval(function () {
        time++
        console.log('进入定时器' + time)
      }, 1000)
    }

    //console.log(flag)
    
    

  },

  stop:function(res){
    var that = this;
    clearInterval(i);
    wx.request({
      url: 'https://vqjdz3e0.qcloud.la',
      data: {
        openid: app.globalData.openId,
        status: 'stop'
      },
      header: {
        'content-type': 'json'
      },
      method: "POST",
      success: function (res) {

        console.log('停止' + JSON.stringify(app.globalData.openId))
        console.log(JSON.stringify(res))
        if (res.errMsg == 'request:ok') {
          that.setData({
            show: '本次运动已结束，运动时间：'+time,
            startSport:'开始运动'
          })
          time=0;
          flag=true;
        } else {
          that.setData({
            show: '连接失败，请检查网络.'
          })
        }
      }
    })
  }
})