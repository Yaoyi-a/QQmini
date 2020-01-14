// app.js
App({
  globalData: {
    openid: '',
    myFavor: [],
    foodlist: [],
    info: {},
    env: 'wx'
  },
  onLaunch() {
    // 获取设备与运行环境信息
    this.globalData.info = wx.getSystemInfoSync();
    if (this.globalData.info.AppPlatform === 'qq') this.globalData.env = 'qq';

    // 登录
    if ((this, this.globalData.env === 'qq'))
      wx.login({
        success: res => {
          wx.request({
            url: 'https://lin.innenu.com/getOpenIdQQ.php',
            data: {
              code: res.code
            },
            success: resp => {
              this.globalData.openid = resp.data.openid;

              // 初始化收藏夹
              wx.request({
                url: 'https://lin.innenu.com/query-favorite.php',
                data: {
                  openid: resp.data.openid
                },
                success: res2 => {
                  this.globalData.myFavor = res2.data;
                }
              });
            }
          });
        }
      });

    wx.request({
      url: 'https://lin.innenu.com/query-food.php',
      success: res => {
        this.globalData.foodlist = res.data;

        for (let i = 0; i < res.data.length; i++)
          this.globalData.foodlist[i].tag = JSON.parse(res.data[i].tag);
      }
    });
  }
});
