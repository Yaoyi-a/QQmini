Page({
  data: {
    List: [],
    load: true,
    restaurant: ''
  },
  onLoad(e) {
    console.log(e);
    this.setData({ restaurant: e.restaurant });
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: 'https://lin.innenu.com/query-restaurant.php',
      data: {
        restaurant: e.restaurant
      },
      success: res => {
        console.log(res);
        const List = res.data;
        this.setData({ List });
      }
    });
  },
  serach() {
    wx.redirectTo({ url: '/pages/detail/detail' });
  },
  onReady() {
    wx.hideLoading();
  },
  tabSelect(event) {
    this.setData({
      TabCur: event.currentTarget.dataset.id,
      MainCur: event.currentTarget.dataset.id,
      VerticalNavTop: (event.currentTarget.dataset.id - 1) * 50
    });
  },
  VerticalMain(event) {
    const { list } = this.data;
    let tabHeight = 0;

    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        const view = wx.createSelectorQuery().select(`#main-${list[i].id}`);

        view
          .fields({ size: true }, data => {
            list[i].top = tabHeight;
            tabHeight += data.height;
            list[i].bottom = tabHeight;
          })
          .exec();
      }

      this.setData({
        load: false,
        list
      });
    }
    const scrollTop = event.detail.scrollTop + 20;

    for (let i = 0; i < list.length; i++)
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        this.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        });
        return false;
      }
  }
});
