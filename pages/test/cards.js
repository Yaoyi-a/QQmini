// pages/test/cards2.js
const cardSet = [{
  id: 1,
  bg: "#F5F4EC"
},
{
  id: 2,
  bg: "#FAC8CD"
},
{
  id: 3,
  bg: "#42BA78"
}
];
const extensionCards = [{
  id: 4,
  bg: "#F3B918"
},
{
  id: 5,
  bg: "#6EC8DB"
}]
// {
//   class: ""
// },
// {
//   class: ""
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardSet
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  addClass() {
    cardSet[0].class = "shrink";
    this.setData({
      cardSet
    }, () => {
      setTimeout(() => {
        cardSet[0].class = "";
        let firstEle = cardSet.shift();
        let firstExtensionEle = extensionCards.shift();
        extensionCards.push(firstEle);
        cardSet.push(firstExtensionEle);
        this.setData({
          cardSet
        })
      }, 400)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})