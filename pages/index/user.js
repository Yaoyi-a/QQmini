// pages/index/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_login: false,
    tips: "要照顾好自己呀",
    avatarUrl: "https://nenuyouth.com/img/icon/nenuyouth.png",
    nickName: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleContact() {
    wx.setClipboardData({ data: "2284490400" })
  },
  removeBadge() {
    wx.removeTabBarBadge({
      index: 2,
      success: function (res) {
        console.log(res)
      }
    })
    wx.navigateTo({
      url: '/pages/views/favor',
    })
  },
  onLoad: function (options) { },
  login(e) {
    let {
      nickName,
      avatarUrl
    } = e.detail.userInfo;
    console.log(e.detail.userInfo.nickName)
    this.setData({
      nickName,
      avatarUrl,
      is_login: true
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
});