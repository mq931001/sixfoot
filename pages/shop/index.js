var videoContext;
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })        
      }
      videoContext = wx.createVideoContext('myVideo')
    }
  },
  inputValue: '',
  data: {
    src: '',
    danmuList: [
      {
        text: '六只脚gogogogo  1111',
        color: '#ff0000',
        time: 1
      },
      {
        text: '六只脚gogogogo 22222',
        color: '#ff00ff',
        time: 3
      }]
  },
 
  methods:{
    bindInputBlur: function (e) {
      this.inputValue = e.detail.value
    },
    bindButtonTap: function () {
      var that = this
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: ['front', 'back'],
        success: function (res) {
          that.setData({
            src: res.tempFilePath
          })
        }
      })
    },
    getRandomColor:function() {
        let rgb = []
        for(let i = 0; i< 3; ++i) {
          let color = Math.floor(Math.random() * 256).toString(16)
          color = color.length == 1 ? '0' + color : color
          rgb.push(color)
        }
        return '#' + rgb.join('')
    },
    bindSendDanmu: function () {
      videoContext.sendDanmu({
        text: this.inputValue,
        color: this.getRandomColor()
      })
    }
  },
  

})
