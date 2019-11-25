let openid;
let user;
let orientation;
Page({
  onShareAppMessage() {},
  data: {
    inputValue: "",
    remarks: [],
    orientation: ""
  },
  refreshInfo() {
    let that = this;
    wx.request({
      url: 'https://lin.innenu.com/query-remark.php',
      data: {
        orientation
      },
      success(res) {
        console.log(res.data)
        that.setData({
          remarks: res.data
        })
      }
    })
  },
  onLoad(e) {
    setTimeout(() => {
      openid = getApp().globalData.openid;
    }, 500)
    orientation = e.orientation;
    this.setData({
      orientation
    })
    this.refreshInfo();
  },
  valueChange(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  login(e) {
    user = e.detail.userInfo.nickName;
    this.setData({
      is_login: true
    })
  },

  faBu() {
    wx.request({
      url: "https://lin.innenu.com/addRemark.php",
      data: {
        orientation,
        content: this.data.inputValue,
        user,
        openid
      },
      success: res => {
        console.log(res.data);
        this.refreshInfo();
      }
    })
  }
})