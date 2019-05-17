// pages/trip_info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tripId:'',
    tripObj: {
      page_num: 0,
      page_size: 40
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.tripId = options.id
    this.getImgAjax()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  // 获取数据
  getImgAjax:function() {
    var _this = this
    wx.request({
      url: 'https://www.foooooot.com/api/v3/trip/' + _this.data.tripId + '/footprint/',
      data: _this.data.tripObj,
      success: function (res) { console.log(res) },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取数据详情
  getTripAjax: function () {
    var _this = this
    wx.request({
      url: 'https://www.foooooot.com/api/v3/trip/' + _this.data.tripId + '?richtxt=1',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { console.log(res) },
      fail: function (res) { },
      complete: function (res) { },
    })
  }


})