// app.js
App({
  globalData: {
    openid: '',
    myFavor: [],
    foodlist: [],
    parsedTags: [],
    myFavorInitialLength: 0
  },
  onLaunch() {
    // 登录
    qq.login({
      success: res => {
        qq.request({
          url: 'https://lin.innenu.com/getOpenIdQQ.php',
          data: {
            code: res.code
          },
          success: resp => {
            this.globalData.openid = resp.data.openid;

            /*
             * 初始化收藏夹
             */
            wx.request({
              url: 'https://lin.innenu.com/query-favorite.php',
              data: {
                openid: resp.data.openid
              },
              success: res2 => {
                this.globalData.myFavor = res2.data;
                this.globalData.myFavorInitialLength = res2.data.length;
              }
            });
          }
        });
      }
    });
    wx.request({
      url: 'https://lin.innenu.com/query-food.php',
      success: res => {
        let parsedTags = [];

        this.globalData.foodlist = res.data;
        for (let i = 0; i < res.data.length; i++) {
          this.globalData.foodlist[i].tag = JSON.parse(res.data[i].tag);
        }
      }
    });
  }
});
