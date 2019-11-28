const dices = [
  { show: false },
  { show: false },
  { show: false },
  { show: false },
  { show: false },
  { show: false }
];

let recentValue = null;
let value = null;
let x = 3;

Page({
  data: {
    /** 种类1 */
    kind1: [
      {
        type: '米饭',
        icon: 'rice',
        iconColor: 'rgb(244,146,85)'
      },
      {
        type: '面条',
        icon: 'noodle',
        iconColor: 'rgb(248,179,58)'
      },
      {
        type: '奶茶',
        icon: 'tea',
        iconColor: 'rgb(255,160,177)'
      }
    ],

    /** 种类2 */
    kind2: [
      {
        type: '粥',
        icon: 'por',
        iconColor: 'rgb(146,205,207)'
      },
      {
        type: '肉类',
        icon: 'fry',
        iconColor: 'rgb(255,166,68)'
      },
      {
        type: '面食',
        icon: 'dumpling',
        iconColor: 'rgb(248,179,58)'
      }
    ],

    /** 口味 */
    taste: ['酸', '甜', '辣', '咸', '少油少盐'],

    /** 地区 */
    area: ['东北风味', '四川风味', '北方风味', '南方风味', '特色菜'],

    showModel: false,
    sale1: [],
    sale2: [],
    x,
    dices,
    showTip: true,
    value: 0,
    url: '/icon/dice0.png'
  },

  onLoad() {
    wx.request({
      url: 'https://lin.innenu.com/query-recommended.php',
      success: res => {
        const [sale1, sale2] = res.data;

        this.setData({ sale1, sale2 });
      }
    });
  },

  showModelOff() {
    this.setData({ showModel: false });
  },

  /** 生成随机数 */
  randomValue() {
    /** 随机数 */
    let rand = Math.floor(1 + Math.random() * 5);

    /** 如果与上次相同则重新摇动 */
    while (rand === recentValue) rand = Math.floor(1 + Math.random() * 5);

    value = rand;
  },

  startDice() {
    const { sale1, sale2 } = this.data;

    if (x > 0)
      setTimeout(() => {
        this.setData({ showModel: true });
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
        url: '/icon/lock.jpg'
      });
    } else {
      // FIXME: What is x?
      x -= 1;
      for (let i = 0; i < 6; i++) dices[i].show = false;

      this.randomValue();

      dices[value].show = true;
      dices[value].mode = !dices[value].mode;
      recentValue = value;

      // 选中
      sale1[value].myclass = 'selected';
      sale2[value].myclass = 'selected';

      this.setData({
        dices,
        showTip: false,
        x,
        value: value + 1,
        sale1,
        sale2
      });
    }
  }
});
