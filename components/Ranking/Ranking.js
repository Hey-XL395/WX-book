// components/Ranking/Ranking.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ranking:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去排行榜详情
    todetails(e){
      console.log(e.currentTarget.dataset.item)
      let id = e.currentTarget.dataset.item._id
      wx.navigateTo({
        url: `../Rankingdetails/Rankingdetails?id=${id}`,
      })
    }
  }
})
