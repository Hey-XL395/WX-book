// pages/minclassification/minclassification.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    male: '',
    index: 0, //上拉刷新，把当前小分类存下来
    title: "",
    num: 0,
    color: ['orange', 'rgb(0,255,255)', "Pink"],
    active: 0,
    active1: 0,
    // 小类
    minname: [],
    // 整个信息
    item: {},
    toplist: [{
      id: 'hot',
      name: '热门'
    }, {
      id: 'new',
      name: '新书'
    }, {
      id: 'reputation',
      name: '好评'
    }, {
      id: 'over',
      name: '完结'
    }, {
      id: 'monthly',
      name: 'VIP'
    }, ],
    tabnav: [],
    major: "hot" ,//默认初始热门，点击之后变化，
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 去详情
  todetails(e) {
    // console.log(e.currentTarget.dataset.item)
    let book = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `../details/details?book=${book}`,
    })
  },
  clicktop(e) {
    // console.log(e)
    // 请求小类数据
    // console.log(e.detail.title)
    // 如果点击全部，请求时少一个是参数，把小分类存下来
    this.setData({
      index: e.detail.index,
      title: e.detail.title,
      num: 0
    })
    if (e.detail.index === 0) {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.male}&type=${this.data.major}&major=${this.data.item.name}&start=${this.data.num}&limit=20`).then(res => {
        console.log(res)
        this.setData({
          tabnav: res.data.books
        })
      }).catch(e => {
        console.log(e)
      })
    } else {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.male}&type=${this.data.major}&major=${this.data.item.name}&minor=${e.detail.title}&start=${this.data.num}&limit=20`).then(res => {
        // console.log(res)
        this.setData({
          tabnav: res.data.books
        })
      }).catch(e => {
        console.log(e)
      })
    }

  },
  clicktop1(e) {
    // console.log(e)
    // 请求大类数据,例如点击热门
    this.setData({
      num: 0
    })

    app.globalData.fly.get(`/book/by-categories?gender=${this.data.male}&type=${this.data.toplist[e.detail.index].id}&major=${this.data.item.name}&start=${this.data.num}&limit=20`).then(res => {
      console.log(res)
      this.setData({
        active1: 0,
        major: this.data.toplist[e.detail.index].id,
        tabnav: res.data.books
      })
    }).catch(e => {
      console.log(e)
    })
  },
  // 周期
  onLoad: function(options) {
    // 赋值
    // console.log(options)
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      item: JSON.parse(options.item),
      minname: JSON.parse(options.minname),
      male: options.male
    })
    this.data.minname.unshift("全部")
    // console.log(this.data.minname)
    this.setData({
      minname: this.data.minname
    })
    // console.log(this.data.item)
    // console.log(this.data.minname)
    // 动态标题
    wx.setNavigationBarTitle({
      title: JSON.parse(options.item).name,
    })
    // 初始全部
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.male}&type=${this.data.toplist[0].id}&major=${this.data.item.name}&start=${this.data.num}&limit=20`).then(res => {
      // console.log(res)
      this.setData({
        tabnav: res.data.books
      })
      wx.hideLoading();
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
    wx.showToast({
      title: '到头了别划了',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '玩命加载中',
    })
    let num1 = this.data.num
    num1 += 20
    this.setData({
      num: num1
    })
    if (this.data.index === 0) {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.male}&type=${this.data.major}&major=${this.data.item.name}&start=${this.data.num}&limit=20`).then(res => {
        console.log(res.data.books)
        if (res.data.books.length === 0) {
          wx.showToast({
            title: '已经加载完了',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          let arr = this.data.tabnav
          res.data.books.map(item => {
            arr.push(item)
          })
          this.setData({
            tabnav: arr
          })
        }

        wx.hideLoading();
      }).catch(e => {
        console.log(e)
      })
    } else {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.male}&type=${this.data.major}&major=${this.data.item.name}&minor=${this.data.title}&start=${this.data.num}&limit=20`).then(res => {
        console.log(res.data.books)
        // 等于空不行，要长度等于0
        if (res.data.books.length === 0) {
          wx.showToast({
            title: '已经加载完了',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          let arr = this.data.tabnav
          res.data.books.map(item => {
            arr.push(item)
          })
          this.setData({
            tabnav: arr
          })
        }
        wx.hideLoading();
      }).catch(e => {
        console.log(e)
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})