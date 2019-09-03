//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    ranking: {},
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 请求书城数据
  getBook() {
    app.globalData.fly.get("/cats/lv2/statistics").then(response => {
      this.setData({
        book: response.data,
      })
      // this.data.book = response.data
      console.log(this.data.book)
      // console.log(res)
    }).catch(e => {
      console.log(e)
    })
  },
  // 请求排行信息
  getRanking() {
    wx.showLoading({
      title: '加载中...',
    })
    app.globalData.fly.get("/ranking/gender").then(res => {
      console.log(res.data)
      wx.hideLoading()
      this.setData({
        ranking: res.data,
      })
    }).catch(e => {
      console.log(res)
    })
  },
  onLoad: function(options) {
    this.getBook()
    this.getRanking()
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
    // 加载刷新
    wx.showNavigationBarLoading()
    // 取消刷新
    setTimeout(() => {
      wx.hideNavigationBarLoading()
    }, 2000)
    console.log("下拉刷新")
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


// //logs.js
// const util = require('../../utils/util.js')

// Page({
//   data: {
//     logs: []
//   },
//   onLoad: function () {
//     this.setData({
//       logs: (wx.getStorageSync('logs') || []).map(log => {
//         return util.formatTime(new Date(log))
//       })
//     })
//   }
// })