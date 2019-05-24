// pages/trip_info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tripId: '',
    tripObj: {
      page_num: 0,
      page_size: 40
    },
    polyline: [{
      points: [],
      color: '#FF0000DD',
      width: 4,
      borderWidth: 10,
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.tripId = options.id
    this.getTripAjax()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 获取线路数据
  getImgAjax: function() {
    var _this = this
    wx.request({
      url: 'https://www.foooooot.com/api/v3/trip/66/?richtxt=1/',
      data: _this.data.tripObj,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取线路经纬度
  getTripAjax: function() {
    var _this = this
    wx.request({
      url: 'https://www.foooooot.com/trip/66/offsettrackjson/',
      method: 'GET',
      success: function(res) {
        console.log(res)
        var data = res.data
        for (var i = 0; i < data.length; i++) {
          _this.data.polyline[0].points.push({
            longitude: data[i][2],
            latitude: data[i][1]
          })
        }
        _this.setData({
          'polyline[0].points': _this.data.polyline[0].points
        })
        var map = wx.createMapContext('map');
        map.includePoints({
          points: _this.data.polyline[0].points,
          success: function(res) {
            console.log(res)
          },
          fail: function(err) {
            console.log(err)
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }


})