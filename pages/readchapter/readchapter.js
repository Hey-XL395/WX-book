// pages/readchapter/readchapter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    read: [],
    item:[]
  },
  // 去阅读界面
  toread(e) {
    console.log(this.data.item)
    let item = JSON.stringify(this.data.item)
    let arr = JSON.stringify(e.currentTarget.dataset.item.title)
    wx.navigateTo({
      url: `../read/read?title=${arr}&item=${item}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(JSON.parse(options.item))
    this.setData({
      item: JSON.parse(options.item)
    })
    let id = JSON.parse(options.item)._id
    app.globalData.fly.get(`/mix-atoc/${id}?view=chapters`).then(res => {
      // console.log(res.data)
      this.setData({
        read: res.data.mixToc.chapters
      })
      console.log(this.data.read)
    }).catch(e => {
      console.log(e)
    })
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