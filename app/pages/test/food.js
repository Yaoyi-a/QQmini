// pages/test/food.js
let category = false;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: false
  },
  categoryToggle() {
    category = !category;
    this.setData({ category });
  }
});
