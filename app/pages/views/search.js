let entireFoodList = [];
Page({
  data: {
    is_show: true,
    inputValue: "",
    foodlist: [],
    classOfBackToTop: "backToTopHide"
  },
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
    if (e.detail.value && e.detail.value != "") {
      let foodlistCurrently = [];
      if (e.detail.value != "") {
        for (let i = 0; i < entireFoodList.length; i++) {
          if (entireFoodList[i].food.includes(this.data.inputValue)) {
            let item = entireFoodList[i];
            if (item.food.length >= 5) {
              item.class = "longText"
            }
            foodlistCurrently.push(item)
          }
        }
        this.setData({
          foodlist: foodlistCurrently
        })
      } else {
        this.setData({
          inputValue: e.detail.value,
        })
      }
    }else{
      this._z = this._i + 20;
      while (this._i < this._z) {
        this.foodlist.push(getApp().globalData.foodlist[this._i]);
        this._i++
      }
      this.setData({
        foodlist: this.foodlist
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
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  backToTop() {
    wx.pageScrollTo({
      selector: "#topAnchor"
    })
  },
  onPageScroll(e) {
    if (e.scrollTop > 400) {
      this.setData({
        classOfBackToTop: "backToTopShow"
      })
    } else {
      this.setData({
        classOfBackToTop: "backToTopHide"
      })
    }
  },
  onReachBottom() {
    if (this.data.inputValue == "") {
      this._z = this._i + 20;
      while (this._i < this._z) {
        this.foodlist.push(getApp().globalData.foodlist[this._i]);
        this._i++
      }
      this.setData({
        foodlist: this.foodlist
      })
    }
  },
  onLoad() {
    this.foodlist = [];
    this._i = 0;
    while (this._i < 20) {
      this.foodlist.push(getApp().globalData.foodlist[this._i]);
      this._i++
    }
    this.setData({
      foodlist: this.foodlist
    })
    entireFoodList = getApp().globalData.foodlist;
  }
})