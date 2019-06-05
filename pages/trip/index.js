
var point = [];
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  },
  data: {
    controlButton:true,
    polyline: [{
      points: [],
      color: '#FF0000DD',
      width: 4,
    }],
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() { },
    ready() {
      var _this = this; 
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
         console.log(res)
          _this.setData({
            longitudeData: res.longitude,
            latitudeData: res.latitude
          })
        }
      })
    },
    detached() { },

  },
  methods:{
    startGps:function(){
      var _this= this;
      wx.showToast({
        title: '开始记录',
      })
      this.setData({
        controlButton:false
      })

      this.timer = setInterval(repeat, 5000);
      function repeat() {      
        _this.getlocation();
       
      }

    },
    suspendGps:function(){
      wx.showToast({
        title: '暂停记录',
      })    
      clearInterval(this.timer);
    },
    uploadGps:function(){
      wx.showToast({
        title: '上传请稍后',
      })
    },
    //获取经纬度
    getlocation: function() {
      var lat, lng;
      var _this = this;
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          lat = res.latitude;
          lng = res.longitude;
          point.push({ latitude: lat, longitude: lng });
          _this.drawLine(point);
        }
      })
    },
    drawLine: function (point){
      console.log(point)     
      this.setData({
        'polyline[0].points': point
      })
    }
  }

})
