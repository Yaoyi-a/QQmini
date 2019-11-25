const app = getApp()
Page({
  data: {
    list: [],
    load: true,
    title: "",
    locate: "",
    des: "",
    img: ""
  },
  onLoad() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: "https://buyaobishige.gitee.io/mini/data/mamaqinjiaoziguan.json",
      success(res) {
        let list = res.data.list;
        let {
          title,
          locate,
          des,
          img
        } = res.data.restaurantPanel;
        for (let i = 0; i < list.length; i++) {
          list[i].id = i;
        }

        that.setData({
          list,
          listCur: list[0],
          title,
          locate,
          des,
          img
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