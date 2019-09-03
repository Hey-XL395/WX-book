// pages/Rankingdetails/Rankingdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 排行数据
Rankingdetails:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 调转到详情页
  todetails(e){
    console.log(e.currentTarget.dataset.item)
    let book = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `../details/details?book=${book}`,
    })
  },
  onLoad: function(options) {
    console.log(options.id)
    // 传ID获取排行数据
    app.globalData.fly.get(`/ranking/${options.id}`).then(res => {
      console.log(res)
      wx.setNavigationBarTitle({
        title: res.data.ranking.shortTitle,
      })
      this.setData({
        Rankingdetails:res.data.ranking.books
      })
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