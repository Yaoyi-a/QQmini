Page({
  data: {
    is_show: true,
    inputValue: "",
    foodlist: []
  },
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
    let foodlistCurrently = [];
    if (e.detail.value != "") {
      for (let i = 0; i < this.data.foodlist.length; i++) {
        if (this.data.foodlist[i].food.includes(this.data.inputValue)) {
          console.log(this.data.foodlist[i])
          foodlistCurrently.push(this.data.foodlist[i])
        }
      }
      this.setData({
        foodlist: foodlistCurrently
      })
    } else {
      this.setData({
        inputValue: e.detail.value,
        foodlist: getApp().globalData.foodlist
      })
    }

  },
  isShow() {
    this.setData({
      is_show: true
    })
  },
  bindBlur() {
    if (this.data.inputValue == "") {
      this.setData({
        is_show: false
      })
    }

  },

  onLoad() {
    let foodlist = getApp().globalData.foodlist;
    console.log(foodlist)
    this.setData({
      foodlist
    })
  }
})