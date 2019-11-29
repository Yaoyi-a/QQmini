Page({
  data: {
    isLogin: false,
    tips: '要照顾好自己呀',
    avatarUrl: 'https://nenuyouth.com/img/icon/nenuyouth.png',
    nickName: ''
  },

  handleContact() {
    wx.setClipboardData({ data: '2284490400' });
  },

  removeBadge() {
    wx.removeTabBarBadge({
      index: 2,
      success: res => {
        console.log(res);
      }
    });

    wx.navigateTo({ url: '/pages/views/favor' });
  },
  login(event) {
    const { nickName, avatarUrl } = event.detail.userInfo;

    this.setData({ nickName, avatarUrl, isLogin: true });
  }
});
