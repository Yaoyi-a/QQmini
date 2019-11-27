let sale1;
let sale2;
const dices = [
  {
    show: false
  },
  {
    show: false
  },
  {
    show: false
  },
  {
    show: false
  },
  {
    show: false
  },
  {
    show: false
  }
];

let recentValue = null;
let value = null;
let x = 3;
Page({
  data: {
    showModel: false,
    sale1: [],
    sale2: [],
    x,
    dices,
    showTip: true,
    value: 0,
    url: '../../mini/dice0.png'
  },
  onLoad() {
    wx.request({
      url: 'https://lin.innenu.com/query-recommended.php',
      success: res => {
        sale1 = res.data[0];
        sale2 = res.data[1];
        this.setData({
          sale1,
          sale2
        });
      }
    });
  },
  showModelOff() {
    this.setData({
      showModel: false
    });
  },
  randomValue() {
    let rand = Math.floor(1 + Math.random() * 5);
    while (rand === recentValue) rand = Math.floor(1 + Math.random() * 5);

    value = rand;
  },
  startDice() {
    if (x > 0)
      setTimeout(() => {
        this.setData({
          showModel: true
        });
      }, 1600);

    for (let i = 0; i < 6; i++) sale2[i].myclass = '';

    for (let i = 0; i < 6; i++) sale1[i].myclass = '';

    if (x < 1) {
      for (let i = 0; i < 6; i++) dices[i].show = false;

      x -= 1;
      this.setData({
        x,
        dices,
        showTip: true,
        url:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573536751126&di=1fe46740ed5bd4a1b048e5e43a20d39d&imgtype=0&src=http%3A%2F%2Fm.xz7.com%2Fup%2F2016-2%2F2016223143828.png'
      });
    } else {
      x -= 1;
      new Promise(resolve => {
        for (let i = 0; i < 6; i++) dices[i].show = false;

        return resolve(1);
      }).then(() => {
        this.randomValue();
        dices[value].show = true;
        dices[value].mode = !dices[value].mode;
        recentValue = value;
        // 选中
        sale1[value].myclass = 'selected';
        sale2[value].myclass = 'selected';
        // ---
        this.setData({
          dices,
          showTip: false,
          x,
          value: value + 1,
          sale1,
          sale2
        });
      });
    }
  }
});
