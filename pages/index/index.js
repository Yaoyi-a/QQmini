let dices = [false, false, false, false, false, false];
let recentValue = null;
let value = null;
Page({
  data: {
    dices: [false, false, false, false, false, false],
    showTip: true,
  },
  randomValue() {
    let rand = Math.floor(1 + Math.random() * (5));
    while (rand == recentValue) {
      rand = Math.floor(1 + Math.random() * (5));
    };
    value = rand
  },
  startDice() {
    new Promise((resolve, reject) => {
      for (let i = 0; i < 6; i++) {
        dices[i] = false
      }
      return resolve(1)
    }).then(() => {
      this.randomValue();
      console.log(value);
      dices[value] = true;
      recentValue = value;
      this.setData({
        dices,
        showTip: false
      })
    })
  }
})