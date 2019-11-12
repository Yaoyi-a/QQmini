let dices = [{
    show: false,
    mode: false
  },
  {
    show: false,
    mode: false
  },
  {
    show: false,
    mode: false
  },
  {
    show: false,
    mode: false
  },
  {
    show: false,
    mode: false
  },
  {
    show: false,
    mode: false
  },
];
let recentValue = null;
let value = null;
let x = 3;
Page({
  data: {
    x,
    tip: "需要我来帮你？\n",
    dices,
    showTip: true,
    showClick: true,
    value: 0
  },
  randomValue() {
    let rand = Math.floor(1 + Math.random() * (5));
    while (rand == recentValue) {
      rand = Math.floor(1 + Math.random() * (5));
    };
    value = rand
  },
  startDice() {
    if (x < 1) {
      for (let i = 0; i < 6; i++) {
        dices[i].show = false;
      };
      this.setData({
        x: 0,
        dices,
        tip: "选恐患者下顿饭再来吧",
        showTip: true,
        showClick: false
      });
    } else {
      if (x == 3) {
        wx.showLoading({
          title: "加载中...",
          mask: true
        })
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
      }

      x--;
      new Promise((resolve, reject) => {
        for (let i = 0; i < 6; i++) {
          dices[i].show = false;
        }
        return resolve(1)
      }).then(() => {
        this.randomValue();
        dices[value].show = true;
        dices[value].mode = !dices[value].mode;
        recentValue = value;
        this.setData({
          dices,
          showTip: false,
          x,
          value: value + 1
        })
      })
    }
  }
})