// pages/test/cards2.js
let badge = 1;
const cardSet = [{
    id: 1,
    bg: "#F5F4EC",
  src: "http://5b0988e595225.cdn.sohucs.com/images/20180204/5ab996768f024731b063f38d1924a403.jpeg",
    desc: "烧腊包括烧鹅、乳鸽、乳猪以及一些卤水菜式。一般是先用秘制的酱汁淹制一段时间再放到炉里烤,烧鹅、乳猪皮脆,肥美,口味略带广东人喜爱的甜味。深井烧鹅、花田乳鸽是其中的“老字号”。广东人逢年过节上香拜神都会带上乳猪,电影(视)开镜也喜切乳猪图吉利。卤水菜式相对清淡,卤水鹅掌(翼)、卤水鸭肾等。"
  },
  {
    desc: "烧腊包括烧鹅、乳鸽、乳猪以及一些卤水菜式。一般是先用秘制的酱汁淹制一段时间再放到炉里烤,烧鹅、乳猪皮脆,肥美,口味略带广东人喜爱的甜味。深井烧鹅、花田乳鸽是其中的“老字号”。广东人逢年过节上香拜神都会带上乳猪,电影(视)开镜也喜切乳猪图吉利。卤水菜式相对清淡,卤水鹅掌(翼)、卤水鸭肾等。",
    id: 2,
    bg: "#FAC8CD",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574488257599&di=e8f954584e5dd617f403dae8943a820d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201401%2F09%2F20140109104001_MuAGN.jpeg"
  },
  {
    desc: "烧腊包括烧鹅、乳鸽、乳猪以及一些卤水菜式。一般是先用秘制的酱汁淹制一段时间再放到炉里烤,烧鹅、乳猪皮脆,肥美,口味略带广东人喜爱的甜味。深井烧鹅、花田乳鸽是其中的“老字号”。广东人逢年过节上香拜神都会带上乳猪,电影(视)开镜也喜切乳猪图吉利。卤水菜式相对清淡,卤水鹅掌(翼)、卤水鸭肾等。",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575082976&di=5da2938460e1adfba0617f300b611418&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20141031%2Fxianglazhangzhongbaofuben4_3355881.jpg",
    id: 3,
    bg: "#42BA78"
  }
];
const extensionCards = [{
    id: 4,
    bg: "#F3B918",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574488257601&di=90afc952a6fb742771c23378567dc9d2&imgtype=0&src=http%3A%2F%2Fstaticfile.tujia.com%2Fupload%2Finfo%2Fday_140613%2F201406131221456681.jpg"
  },
  {
    id: 5,
    bg: "#6EC8DB",
    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574488257599&di=85acd6470cce6dad694f5159d9795ec0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01173658ddc586a801219c777ce1d1.jpg%401280w_1l_2o_100sh.png"
  }
]

Page({
  data: {
    cardSet
  },
  onLoad: function(options) {

  },
  toFavor() {
    badge = 1;
    wx.removeTabBarBadge({
      index: 1
    })
    wx.navigateTo({
      url: "../views/favor"
    })
  },
  addClass() {
    wx.setTabBarBadge({
      index: 1,
      text: String(badge)
    })
    badge++;

    cardSet[0].class = "shrink";
    this.setData({
      cardSet
    }, () => {
      setTimeout(() => {
        cardSet[0].class = "";
        let firstEle = cardSet.shift();
        let firstExtensionEle = extensionCards.shift();
        extensionCards.push(firstEle);
        cardSet.push(firstExtensionEle);
        this.setData({
          cardSet
        })
      }, 550)
    })
  }
})