const app = getApp()
Page({
  data: {
    list: [],
    load: true
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    const list = [{
      name: '饼类',
      content: [
        {
          name: '手抓饼',
          img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574006786897&di=7128f3bf57a3a4dbb0d4af0c715ef7c0&imgtype=0&src=http%3A%2F%2Fhao.qudao.com%2Fupload%2Farticle%2F20170725%2F43083402711500975079.jpg",
          price: '8',
          round: true,
          desc: '非常好吃的菜',
          popular: '  '
        },
        
        {
          name: '烤冷面',
          img: "../../images/mian.jpg",
          price: '10',
          round: false,
          desc: 'nice taste',
          popular: '  '
        },

      ]
    }, {
        name: '饼类',
        content: [
          {
            name: '手抓饼',
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574006786897&di=7128f3bf57a3a4dbb0d4af0c715ef7c0&imgtype=0&src=http%3A%2F%2Fhao.qudao.com%2Fupload%2Farticle%2F20170725%2F43083402711500975079.jpg",
            price: '8',
            round: true,
            desc: '非常好吃的菜',
            popular: '  '
          },

          {
            name: '烤冷面',
            img: "../../images/mian.jpg",
            price: '10',
            round: false,
            desc: 'nice taste',
            popular: '  '
          },

        ]
      }, {
        name: '饼类',
        content: [
          {
            name: '手抓饼',
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574006786897&di=7128f3bf57a3a4dbb0d4af0c715ef7c0&imgtype=0&src=http%3A%2F%2Fhao.qudao.com%2Fupload%2Farticle%2F20170725%2F43083402711500975079.jpg",
            price: '8',
            round: true,
            desc: '非常好吃的菜',
            popular: '  '
          },

          {
            name: '烤冷面',
            img: "../../images/mian.jpg",
            price: '10',
            round: false,
            desc: 'nice taste',
            popular: '  '
          },

        ]
      }, {
      name: '炒菜',
      content: [
        {
          name: '鱼香肉丝',
          img: "/images/meat.jpg",
          price: '18',
          round: false,
          desc: '非常好吃的菜',
          popular: '  '
        },
        {
          name: '辣子鸡',
          img: "/images/laziji.jpg",
          price: '50',
          round: false,
          desc: '非常难吃的菜',
          popular: '  '
        },
        {
          name: '烧茄子',
          img: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573996481&di=1f7e9043381b4c47b4edb0a276552dda&src=http://uploads.xuexila.com/allimg/1612/703-16122GG306.jpg',
          price: '18',
          badge: '推荐',
          badgeColor: 'red',
          round: true,
          desc: '非常好吃的菜',
          popular: '  '
        },
        {
          name: '香辣肉丝炒饭',
          img: "/images/cuisine.jpg",
          price: '18',
          round: true,
          desc: '非常好吃的菜',
          popular: '  '
        },]
    },
    ]


    for (let i = 0; i < list.length; i++) {
      list[i].id = i;
    }

    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  serach: function (e) {
    wx.redirectTo({
      url: '/pages/detail/detail',
    });
  }
  , onReady() {
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