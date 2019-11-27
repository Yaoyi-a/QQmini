Page({
  data: {
    isShowed: true,
    inputValue: '',
    foodlist: []
  },

  onLoad() {
    const { foodlist } = getApp().globalData;
    console.log(foodlist);
    this.setData({ foodlist });
  },

  bindInput(event) {
    this.setData({ inputValue: event.detail.value });
    const foodlistCurrently = [];

    if (event.detail.value === '')
      this.setData({ foodlist: getApp().globalData.foodlist });
    else {
      for (let i = 0; i < this.data.foodlist.length; i++)
        if (this.data.foodlist[i].food.includes(this.data.inputValue)) {
          console.log(this.data.foodlist[i]);
          foodlistCurrently.push(this.data.foodlist[i]);
        }

      this.setData({ foodlist: foodlistCurrently });
    }
  },

  isShow() {
    this.setData({ isShowed: true });
  },

  bindBlur() {
    if (this.data.inputValue === '') this.setData({ isShowed: false });
  }
});
