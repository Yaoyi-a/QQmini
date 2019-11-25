//app.js
App({
  globalData:{
    openid:"",
    myFavor:[],
    myFavorInitialLength:0
  },
  onLaunch: function() {
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: "https://lin.innenu.com/getOpenId.php",
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
              success: res => {
                this.globalData.myFavor=res.data;
                this.globalData.myFavorInitialLength=res.data.length;
                console.log(this.globalData.myFavor)
              }
            })
          }
        })
      }
    })




    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


  },

})