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
    imgObj:{
      page_num:0,
      page_size:20
    },
    imgData:[],
    tripInfo:{'1':'22'},
    polyline: [{
      points: [],
      color: '#FF0000DD',
      width: 4,    
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.tripId = options.id
    this.getTripInfo()  //获取线路信息
    this.getTripGps()
    this.getImgAjax()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },
  // 获取线路数据
  getTripInfo: function() {
    var _this = this
    wx.request({
      url: 'https://www.foooooot.com/api/v3/trip/'+_this.data.tripId+'/?richtxt=1/',
      data: _this.data.tripObj,
      success: function(res) {
        console.log(res)
        if(res.data.ret){
          var data = res.data.data
          _this.data.tripInfo = data
          _this.setData({
            tripInfo:_this.data.tripInfo
          })
          console.log(_this.data.tripInfo)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取线路经纬度
  getTripGps: function() {
    var _this = this
    wx.request({
      url: 'https://www.foooooot.com/trip/'+_this.data.tripId+'/offsettrackjson/',
      method: 'GET',
      success: function(res) {        
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
           
          },
          fail: function(err) {
            console.log(err)
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getImgAjax:function(){
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.foooooot.com/api/v3/trip/'+_this.data.tripId+'/footprint/',
      method: 'GET',
      data:_this.data.imgObj,
      success: function(res) {              
        var data = res.data.data  
        if(res.data.ret){
          _this.data.imgData.push(...data)
          _this.setData({
            imgData:_this.data.imgData
          })
          console.log(_this.data.imgData)
        }
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading()
      },
    })
  },

  onReachBottom(){
    this.data.imgObj.page_num++;
    this.getImgAjax(this.data.tripObj) 
  },

  onShareAppMessage: function () {  
    return {
      title: '线路详情',
      path: '/pages/trip_info/index?id='+this.data.tripId,
      success: function (res) { }
    }
  }

})