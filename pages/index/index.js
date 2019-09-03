//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    likebook: [],
    flag1: true
  },
  // 去阅读
  toread(e) {
    console.log(e.currentTarget.dataset.item)
    let arr = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `../read/read?item=${arr}`,
    })
  },
  // 显示删除
  del() {
    this.setData({
      flag: !this.data.flag
    })
  },
  // 点击删除
  del1(e) {
    console.log(e.currentTarget.dataset.item)
    console.log(e.currentTarget.dataset.index)
    let arr = wx.getStorageSync("likebook")
    // console.log(arr)
    // arr.splice(e.currentTarget.dataset.index, 1)
    // console.log(arr.splice(e.currentTarget.dataset.index, 1)) // 只有一项
    // console.log(arr) // 删除一项后的数组
    // 过滤删除
    arr = arr.filter(item => {
      return JSON.stringify(item) !== JSON.stringify(e.currentTarget.dataset.item)
    })
    wx.setStorageSync("likebook", arr)
    this.setData({
      likebook: arr
    })
  },
  // 去帮助页面
  tohelp() {
    wx.navigateTo({
      url: `../help/help`,
    })
    console.log(this.data.flag)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    let arr = wx.getStorageSync("likebook")
    wx.hideLoading()
    if (arr.length === 0) {
      this.setData({
        flag1: false
      })
      console.log(this.data.flag1)
    } else {
      this.setData({
        flag1: true
      })
    }
    this.setData({
      likebook: arr
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
    let arr = wx.getStorageSync("likebook")
    this.setData({
      likebook: arr
    })
    if (arr.length === 0) {
      this.setData({
        flag1: false
      })
      console.log(this.data.flag1)
    } else {
      this.setData({
        flag1: true
      })
    }
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


// Page({
// data: {
// list: [{
//     name: "jack"
//   },
//   {
//     name: "tom"
//   },
// ],
// name: "rose"
// },
// 参数是event
//   send(e){
// console.log(e)
//   },
// toclass(e) {
// console.log(e.target.dataset)
// let item = e.target.dataset
// this.data.name才能打印
// 修改要使用
// this.setData({
//   name: "sky"
// })
// switchTab  tab跳
// navigateTo 任意路由跳
// wx.switchTab({
//   url:"../search/search"
// })
// 传参
// wx.switchTab({
//   url: `../search/search?name=$(this.data.name)`,
// })
// },
// })