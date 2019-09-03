// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    leftdetails: {},
    active: 0,
    reviews: [],
    bookss: [],
    flag:true,
    read:[],
    bookshelf:"加入书架"
  
  },
  // 添加到书架
  addbook() {
    if(this.data.bookshelf === "已在书架"){
      wx.showToast({
        title: '已在书架',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }
    if (!wx.getStorageSync("likebook")) {
      let arr = []
      wx.setStorageSync('likebook', arr)
    }
    let arr = wx.getStorageSync("likebook")
    arr.map(item=>{
      console.log(item)
      if (JSON.stringify(this.data.details) === JSON.stringify(item)) {
        this.setData({
          flag:false
        })
      }
    })
    if (this.data.flag) {
      // 默认读到第一章
      this.data.details.history = 0
      arr.push(this.data.details)
      // console.log(arr)
      wx.showToast({
        title: '已添加',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      this.setData({
        bookshelf:"已在书架"
      })
    }
    this.setData({
      flag: true
    })
    wx.setStorageSync('likebook', arr)
// console.log(arr)


  },
  // 点击章节总数路由跳转
  toreadchapter() {
    let read = JSON.stringify(this.data.details)
    console.log(read)
    wx.navigateTo({
      url: `../readchapter/readchapter?item=${read}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(JSON.parse(options.book))
    this.setData({
      details: JSON.parse(options.book)
    })
    // 进入页面判断是否已在书架
    let arr = wx.getStorageSync("likebook")
    arr.map(item => {
      if (JSON.stringify(this.data.details) === JSON.stringify(item)) {
        this.setData({
          flag: false
        })
      }
    })
    if (!this.data.flag) {
      this.setData({
        bookshelf: "已在书架"
      })
    }
    // 评论数据
    app.globalData.fly.get(`/post/review/by-book?book=${this.data.details._id}`).then(res => {
      this.setData({
        reviews: res.data.reviews
      })
    }).catch(e => {
      console.log(e)
    })
    // 章节总数
    app.globalData.fly.get(`/mix-atoc/${this.data.details._id}?view=chapters`).then(res => {
      // console.log(res.data)
      this.setData({
        read: res.data.mixToc.chapters
      })
      // console.log(this.data.read)
    }).catch(e => {
      console.log(e)
    })
        
// 详情数据
    app.globalData.fly.get(`/book/${this.data.details._id}`).then(res => {
      // console.log(res.data)
      this.setData({
        leftdetails: res.data
      })
    }).catch(e => {
      console.log(e)
    })
    // 相关书籍
    app.globalData.fly.get(`/book/${this.data.details._id}/recommend`).then(res => {

      // 数组打乱
      var testArray = res.data.books;
      if (!Array.prototype.derangedArray) {
        Array.prototype.derangedArray = function() {
          for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
          return this;
        };
      }
      // console.log(testArray.derangedArray()); //结果不唯一
      // 生成三个随机数
      // let num = Math.floor(Math.random() * 10)
      // let num1 = Math.floor(Math.random() * 10)
      // let num2 = Math.floor(Math.random() * 10)
      // if (num1 === num2 || num1 === num || num === num2) {
      //   console.log("相等")
      // }
      // let arr = [num1, num2, num]

      this.setData({
        bookss: res.data.books
      })
      this.setData({
        books: res.data.books
      })
      this.setData({
        books: this.data.books.slice(0, 3)
      })
    }).catch(e => {
      console.log(e)
    })

  },
  // 开始阅读,路由跳转
  read() {
    let arr = JSON.stringify(this.data.details)
    wx.navigateTo({
      url: `../read/read?item=${arr}`,
    })
  },
  // 换一换
  replay() {
    var testArray = this.data.bookss;
    if (!Array.prototype.derangedArray) {
      Array.prototype.derangedArray = function() {
        for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
      };
    }
    // console.log(testArray.derangedArray());
    this.setData({
      books: testArray.derangedArray().slice(0, 3)
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