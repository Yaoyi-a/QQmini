const app = getApp()
Page({
  data: {
    List: [],
    load: true,
    restaurant: ""
  },
  onLoad(e) {
    console.log(e)
    this.setData({
      restaurant: e.restaurant
    })
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: "https://lin.innenu.com/query-restaurant.php",
      data: {
        restaurant: e.restaurant
      },
      success(res) {
        console.log(res)
        let list = res.data;
        that.setData({
          List:list
        })
      }
    })
  },
  serach: function(e) {
    wx.redirectTo({
      url: '/pages/detail/detail',
    });
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})