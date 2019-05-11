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
    selectedColor:'#00BC71',
    "list": [
      {
        "pagePath": "/pages/index/index",
        "iconClass":'iconicon_home',
        "text": "首页"
      },
      {
        "pagePath": "/pages/active/index",
        "iconClass": 'iconicon_event',
        "text": "活动"
      },
      {
        "pagePath": "/pages/trip/index",
        "iconClass": 'iconjilu',
        "text": "记录"
      },
      {
        "pagePath": "/pages/shop/index",
        "iconClass": 'iconicon_post',
        "text": "商城"
      },
      {
        "pagePath": "/pages/user/index",
        "iconClass": 'iconicon_mine',
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
