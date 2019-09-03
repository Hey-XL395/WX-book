// components/classification/classification.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: {
      type: Array
    },
    type: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    minclass: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    minclassification(e) {
      console.log(this.properties.type)
      // 点击分类页面获取小类
      app.globalData.fly.get("/cats/lv2").then(res => {
        // console.log(res.data)
        console.log(res.data[this.properties.type])
        this.setData({
          minclass: res.data[this.properties.type],
        })
        // console.log(e)
        this.data.minclass.map(item => {
          if (e.currentTarget.dataset.item.name === item.major) {
            this.setData({
              minclass: item.mins,
            })
          }
        })

        let item = JSON.stringify(e.currentTarget.dataset.item)
        let item1 = JSON.stringify(this.data.minclass)
        let item2 = this.properties.type
        // console.log(item)
        // console.log(item1)
        wx.navigateTo({
          url: `../../pages/minclassification/minclassification?item=${item}&minname=${item1}&male=${item2}`,
        })
      }).catch(e => {
        console.log(res.data)
      })
    }
  }
})