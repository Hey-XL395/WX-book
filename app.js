//app.js
const Fly = require("./lib/fly/wx.js")
const fly = new Fly
fly.config.baseURL = "https://api.zhuishushenqi.com"
App({
  onLaunch: function () {
    if (!wx.getStorageSync("likebook")) {
      let arr = []
      wx.setStorageSync('likebook', arr)
    }
  },
  globalData: {
    // 相当于vuex
    userInfo: null,
    fly:fly
  }
})