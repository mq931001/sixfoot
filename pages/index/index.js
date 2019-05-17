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
    imgUrls: [],
    tripData:[],
    tripObj:{
      page_num : 0,
      page_size: 40
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() { },
    ready() { this.getAjax(this.data.tripObj) },
    detached() { },
   
  },
  methods:{
    // 获取数据操作
    getAjax(obj){
      var _this = this;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'https://test.foooooot.com/api/v3/feed/home_new/', //上线的话必须是https，没有appId的本地请求貌似不受影响 
        method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
        data:{
          page_num: obj.page_num,
          page_size: obj.page_size
        },
        header: {
          'Content-Type': "application/x-www-form-urlencoded"        
        }, // 设置请求的 header
        success: function (res) {
          console.log(res)   
          wx.hideLoading({
            title: '加载中',
          })       
          if(res.data.ret){
            var datalist = res.data.data;
            var carousel = datalist[0].target_data;
            for (var i = 1; i < carousel.length;i++){              
              if (carousel[i].data_type !== 19){
                _this.data.imgUrls.push(carousel[i])
              }
            }
            for(var i = 0;i<datalist.length;i++){
              if(datalist[i].data_type === 13){
                _this.data.tripData.push(datalist[i].target_data[0])
              }
            }  
            _this.setData({
              imgUrls: _this.data.imgUrls,
              tripData: _this.data.tripData
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
    },
    toTripInfo(e){
     
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/trip_info/index?id=' + id
      })
    },

    // 滚动事件，滚动到底部
    upper(e){
      this.data.tripObj.page_num++;
      this.getAjax(this.data.tripObj)
      
    }
  }
})
