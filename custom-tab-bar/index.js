var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,  
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "/pages/active/index",
        "text": "活动"
      },
      {
        "pagePath": "/pages/trip/index",
        "text": "记录"
      },
      {
        "pagePath": "/pages/shop/index",
        "text": "商城"
      },
      {
        "pagePath": "/pages/user/index",
        "text": "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
