// pages/diasplay/display.js
var charts = require('../../chart/wxcharts.js')
const app = getApp();
var lineChart = null;
var startPos = null;
var flag=true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  send:function (){
    if(flag){
    }
    return 1
  },
  onLoad: function(options) {
    


   // if(app.globalData.userInfo){
   // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },



  //创造数据
  createSimulationData: function () {
    var categories = [];
    var time_data = [];
    var distance_data = [];
    var calorie_data = [];
    for (var i = 0; i < 50; i++) {
      categories.push('201620162-' + (i + 1));
      time_data.push(Math.random() * (20 - 10) + 10);
      distance_data.push(Math.random() * (20 - 10) + 10);
      calorie_data.push(Math.random() * (20 - 10) + 10);
    }
    return {
      categories: categories,
      time_data: time_data,
      distance_data: distance_data,
      calorie_data: calorie_data
    }
  },




  //事件响应函数

  //绘制运动时间曲线
  SportTime: function(res) {
      wx.sendSocketMessage({
        data:'time',
        success: (res) => {
          console.log('发送成功')
        },
        fail: (res) => {
          console.log('发送失败')
        }
      })

    var w,h;
    wx.getSystemInfo({
      success: (res) => {
        this.show = res;
        w = res.windowWidth;
        h = res.windowHeight*0.5;
      },
    })
    console.log('绘图开始')
    var simulationData = this.createSimulationData();
   // console.log(simulationData.categories)
    lineChart = new charts({
      canvasId: 'myCanvas',
      type: 'line',
      categories: simulationData.categories,
      series: [{
        name: '运动时间',
        data: simulationData.time_data,
        format: function(val) {
          return val.toFixed(2) + '分钟';
        }
      }],
      yAxis: {
        title: '运动时间(分钟)',
        format: function(val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: w,
      height: h,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    })
    console.log('绘图结束')
  },


  //绘制卡路里曲线
  Calorie:function(){

    wx.sendSocketMessage({
      data: 'calorie',
      success: (res) => {
        console.log('发送成功')
      },
      fail: (res) => {
        console.log('发送失败')
      }
    })

    var w, h;
    try{
      wx.getSystemInfo({
        success: (res) => {
          this.show = res;
          w = res.windowWidth;
          h = res.windowHeight * 0.5;
        },
      })
    }catch(e){
      console.error('读取手机信息错误');
    }

    console.log('绘图开始')
    lineChart = new charts({
      canvasId: 'myCanvas',
      type: 'line',
      categories: this.createSimulationData().categories,
      animation:true,
      series: [{
        name: '卡路里',
        data: this.createSimulationData().calorie_data,
        format: function (val) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        title: '卡路里',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: w,
      height: h,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    })
    console.log('绘图结束')
  },


  //绘制里程曲线
  Distance:function(){

    wx.sendSocketMessage({
      data: 'distance',
      success: (res) => {
        console.log('发送成功')
      },
      fail: (res) => {
        console.log('发送失败')
      }
    })

    var w, h;
    wx.getSystemInfo({
      success: (res) => {
        this.show = res;
        w = res.windowWidth;
        h = res.windowHeight * 0.5;
      },
    })
    console.log('绘图开始')
    lineChart = new charts({
      canvasId: 'myCanvas',
      type: 'line',
      categories: this.createSimulationData().categories,
      series: [{
        name: '里程',
        data: this.createSimulationData().distance_data,
        format: function (val) {
          return val.toFixed(2) + 'Km';
        }
      }],
      yAxis: {
        title: '里程(公里)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: w,
      height: h,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    })
    console.log('绘图结束')
  }



})