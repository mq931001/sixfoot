Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected:4
        })
      }
    }
  },
  lifetimes:{
    created: function () {
      // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用setData
      console.log('Component-1 >> created');
    },
    attached: function () {
      // 组件生命周期函数，在组件实例进入页面节点树时执行。
      console.log('Component-1 >> attached');
    },
    ready: function () {
      // 在组件布局完成后执行，此时可以获取节点信息
      wx.login({
        success:function(res){
          console.log(res)
        }
      })
    },
    moved: function () {
      // 在组件实例被移动到节点树另一个位置时执行
      console.log('Component-1 >> moved');
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log('Component-1 >> detached');
    },
  }
})
