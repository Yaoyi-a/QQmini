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
  },
  onShow() {
    console.log("这里是index页的onShow")
  },
  onHide() {
    console.log("这里是index页的onHide")
  },
  onReady() {
    console.log("这里是index页的onReady")
  }
})