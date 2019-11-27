Page({
  data: {
    character: "",
    foodlist: []
  },

  onLoad(e) {

    let foodlist = getApp().globalData.foodlist;
    console.log(foodlist)
    this.setData({
      character: e.character,
      foodlist
    })
  }
})