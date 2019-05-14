var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data:{
    imgUrls: []
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() { },
    ready() { this.getAjax() },
    detached() { },
   
  },
  methods:{
    getAjax(){
      var _this = this;
      wx.request({
        url: 'http://test.foooooot.com/api/v3/feed/home_new/?page_num=0&page_size=10', //上线的话必须是https，没有appId的本地请求貌似不受影响 
        method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
        header: {
          'Content-Type': "application/x-www-form-urlencoded"        
        }, // 设置请求的 header
        success: function (res) {
          console.log(res)          
          if(res.data.ret){
            var datalist = res.data.data;
            var carousel = datalist[0].target_data;
            var arr = []
            for (var i = 0; i < carousel.length;i++){              
              if (carousel[i].data_type !== 19){
                arr.push(carousel[i])
              }
            }  
            _this.setData({
              imgUrls:arr
            }) 
          }
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function () {
          // complete 
        }
      })
    },

    // 轮播图点击事件
    carouselClick(){
      wx.showToast({
        title: '点击轮播图',
      })
    }
  }
})
