// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: ['orange', 'red', 'green', 'rgb(0,255,255)', "Pink", "Salmon"],
    search: "",
    flag1: true,
    searchbook: [],
    flag: true,
    History: [],
    everybodysearch: [],
    alleverybodysearch: [],
    num: 0,
    colornum: 0
  },
  // 去详情页
  todetails(e) {
    let arr = wx.getStorageSync("search")
    arr.map(item => {
      if (item === this.data.search) {
        this.setData({
          flag: false
        })
      }
    })
    if (this.data.flag) {
      if (arr) {
        arr.push(this.data.search)
        wx.setStorageSync("search", arr)
      }
    }
    this.setData({
      flag: true
    })

    console.log(e.currentTarget.dataset.item)
    let book = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `../details/details?book=${book}`,
    })
  },
  // 清空搜搜历史
  del1() {
    let arr = []
    this.setData({
      History: arr
    })
    wx.setStorageSync("search", arr)
  },
  // 点击历史搜索
  insearch(e) {
    this.setData({
      flag1: false
    })
    console.log(e.currentTarget.dataset.item)
    this.setData({
      search: e.currentTarget.dataset.item
    })
    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.search}`).then(res => {
      console.log(res.data.books)
      this.setData({
        searchbook: res.data.books
      })
      // console.log(this.data.read)
    }).catch(e => {
      console.log(e)
    })
  },
  // 进行搜索
  search(e) {
    this.setData({
      search: e.detail
    })

    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.search}`).then(res => {
      console.log(res.data.books)
      this.setData({
        searchbook: res.data.books
      })
      if (this.searchbook === "") {
        this.setData({
          flag1: true
        })
      } else {
        this.setData({
          flag1: false
        })
      }
      if (this.data.search === "") {
        this.setData({
          flag1: true
        })
      }
      // console.log(this.data.read)
    }).catch(e => {
      console.log(e)
    })
    console.log(this.data.search)
  },
  // 点击换一换
  replay() {
    // 数组打乱
    var testArray = this.data.color;
    if (!Array.prototype.derangedArray) {
      Array.prototype.derangedArray = function() {
        for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
      };
    }
    console.log(testArray.derangedArray()); //结果不唯一
    this.setData({
      color: testArray.derangedArray()
    })
    let num1 = this.data.num + 6
    this.setData({
      num: num1,
      everybodysearch: this.data.alleverybodysearch.slice(num1, num1 + 6)
    })
    console.log(this.data.alleverybodysearch)
    console.log(this.data.alleverybodysearch.slice(num1, num1 + 6))
    console.log(this.data.num)
    if (this.data.everybodysearch.length < 6) {
      this.data.everybodysearch.push(this.data.alleverybodysearch[7])
      this.data.everybodysearch.push(this.data.alleverybodysearch[8])
      this.setData({
        num: -6,
        everybodysearch: this.data.everybodysearch
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 路由接受参数
  onLoad: function(options) {
    if (!wx.getStorageSync("search")) {
      let arr = []
      wx.setStorageSync("search", arr)
    }
    let arr = wx.getStorageSync("search")
    this.setData({
      History: arr
    })
    // 大家都在搜
    app.globalData.fly.get(`/book/hot-word`).then(res => {
      console.log(res.data)
      this.setData({
        alleverybodysearch: res.data.hotWords
      })
      this.setData({
        everybodysearch: res.data.hotWords.slice(this.data.num, 6)
      })
      // console.log(this.data.read)
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
    let arr = wx.getStorageSync("search")
    this.setData({
      History: arr
    })
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