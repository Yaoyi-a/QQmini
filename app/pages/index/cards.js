// pages/test/cards2.js
let openid;
let myFavor;
let myFavorInitialLength;
let badge=1;
let cardSet;
let extensionCards;
Page({
  data: {
    cardSet,
  },
  onLoad: function(options) {
    setTimeout(() => {
      openid = getApp().globalData.openid;
      setTimeout(() => {
        myFavor = getApp().globalData.myFavor;
        myFavorInitialLength = getApp().globalData.myFavorInitialLength;
      }, 400)
    }, 400)

    let that = this;
    wx.request({
      url: 'https://lin.innenu.com/query-card.php',
      success(res) {
        cardSet = [res.data[0], res.data[1], res.data[2]];
        extensionCards = [res.data[3], res.data[4]];
        that.setData({
          cardSet
        })
      }
    })

    wx.showLoading({
      title: 'loading'
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1500)
  },

  toFavor() {
    badge = 1;
    wx.removeTabBarBadge({
      index: 2,
      success: res => {
        console.log(res)
      }
    });
    wx.navigateTo({
      url: "../views/favor"
    })
  },

  removeCard() {
    cardSet[0].class = "destroy";
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
      }, 550)
    })
  },

  addToFavor() {
    // wx.request({
    //   url: 'https://lin.innenu.com/query-remark.php',
    // })
    let is_duplicated = false;
    let that = this;
    let {
      obj_id,
      category = "card",
      name,
      locate,
      restaurant,
      src
    } = cardSet[0];
    for (let i = 0; i < myFavor.length; i++) {
      if (category == myFavor[i].category && obj_id == myFavor[i].obj_id) {
        is_duplicated = true;
        wx.showToast({
          title: "它已经在收藏夹里啦",
          duration: 1000
        })
        this.removeCard();
      }
    }
    if (is_duplicated == false) {
      myFavor.push({
        obj_id,
        category,
        name,
        locate,
        restaurant,
        src
      })

      console.log(openid)
      wx.setTabBarBadge({
        index: 2,
        text: String(badge),
      })
      badge ++;
      wx.request({
        url: "https://lin.innenu.com/addToFavor.php",
        data: {
          openid,
          obj_id,
          category,
          name,
          locate,
          restaurant,
          src
        },
        success(res) {
          console.log(res.data);
        }
      })
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
        }, 550)
      })
    }

  },




  addClass() {
    wx.setTabBarBadge({
      index: 2,
      text: String(badge)
    })
    badge++;

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
      }, 0)
    })
  }
})