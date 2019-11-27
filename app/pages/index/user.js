// pages/index/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_login: false,
    tips: '要照顾好自己呀',
    avatarUrl: 'https://nenuyouth.com/img/icon/nenuyouth.png',
    nickName: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleContact() {
    wx.setClipboardData({ data: '2284490400' });
  },
  removeBadge() {
    wx.removeTabBarBadge({
      index: 2,
      success(res) {
        console.log(res);
      }
    });
    wx.navigateTo({
      url: '/pages/views/favor'
    });
  },
  login(event) {
    const { nickName, avatarUrl } = event.detail.userInfo;
    console.log(event.detail.userInfo.nickName);
    this.setData({
      nickName,
      avatarUrl,
      is_login: true
    });
  }
});
