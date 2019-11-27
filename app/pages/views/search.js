Page({
  data: {
    is_show: true,
    inputValue: '',
    foodlist: []
  },
  bindInput(event) {
    this.setData({
      inputValue: event.detail.value
    });
    const foodlistCurrently = [];

    if (event.detail.value === '')
      this.setData({
        inputValue: event.detail.value,
        foodlist: getApp().globalData.foodlist
      });
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
    this.setData({ is_show: true });
  },
  bindBlur() {
    if (this.data.inputValue === '') this.setData({ is_show: false });
  },

  onLoad() {
    const { foodlist } = getApp().globalData;
    console.log(foodlist);
    this.setData({ foodlist });
  }
});
