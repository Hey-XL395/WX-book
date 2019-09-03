// pages/read/read.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    read: [],
    index1: 0,
    item1: [],
    readtitle: {},
    article: {}
  },
  // 上一章
  up() {
    if (this.data.index1 > 0) {
      let arr = this.data.index1
      arr -= 1
      this.setData({
        index1: arr
      })
      this.setData({
        readtitle: this.data.read[this.data.index1]
      })
      // 存入当前阅读章节
      let likebook = wx.getStorageSync("likebook")
      console.log(this.data.item1)
      likebook.map(item => {
        if (item._id === this.data.item1._id) {
          item.history = this.data.index1
        }
      })
      wx.setStorageSync("likebook", likebook)

      // 请求章节内容
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${this.data.read[this.data.index1].link}`).then(res => {
        console.log(res.data)
        this.setData({
          article: res.data.chapter.body
        })

      }).catch(e => {
        console.log(e)
      })
      console.log(this.data.index1)
    }
    if (this.data.index1 === 0) {
      wx.showToast({
        title: '已经是第一章了',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }
  },
  // 下一章
  down() {
    if (this.data.index1 >= 0) {
      let arr = this.data.index1
      arr += 1
      this.setData({
        index1: arr
      })
      this.setData({
        readtitle: this.data.read[this.data.index1]
      })
      // 存入当前阅读章节
      let likebook = wx.getStorageSync("likebook")
      console.log(this.data.item1)
      likebook.map(item => {
        if (item._id === this.data.item1._id) {
          item.history = this.data.index1
        }
      })
      wx.setStorageSync("likebook", likebook)
      // 请求章节内容
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${this.data.read[this.data.index1].link}`).then(res => {
        console.log(res.data)
        this.setData({
          article: res.data.chapter.body
        })

      }).catch(e => {
        console.log(e)
      })
      console.log(this.data.index1)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log(JSON.parse(options.title))
    console.log(JSON.parse(options.item))

    // console.log(JSON.parse(options.item))
    // let item = JSON.parse(options.item)
    // console.log(item)
    // 主要是保存id，存入相应章节记录
    // this.setData({
    //   item1: item
    // })
    // // 动态标题
    // wx.setNavigationBarTitle({
    //   title: item.title,
    // })
    // // 请求章节标题
    // app.globalData.fly.get(`/mix-atoc/${item._id}?view=chapters`).then(res => {
    //   // 所有标题
    //   // console.log(res.data.mixToc.chapters)
    //   this.setData({
    //     read: res.data.mixToc.chapters
    //   })
    //   // 默认上次阅读章节
    //   let likebook = wx.getStorageSync("likebook")
    //   likebook.map(item => {
    //     console.log(item._id)
    //     if (item._id === this.data.item1._id) {
    //       if(item.history){
    //         this.data.index1 = item.history
    //       }
    //     }
    //   })
    //   this.setData({
    //     readtitle: this.data.read[this.data.index1]
    //   })
    //   console.log(this.data.read[this.data.index1])
    //   // 请求章节内容
    //   app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${this.data.read[this.data.index1].link}`).then(res => {
    //     console.log(res.data)
    //     this.setData({
    //       article: res.data.chapter.body
    //     })

    //   }).catch(e => {
    //     console.log(e)
    //   })
    // }).catch(e => {
    //   console.log(e)
    // })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})