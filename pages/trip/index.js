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

  }
})
