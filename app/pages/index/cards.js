// pages/test/cards2.js
let openid;
let myFavor;
let myFavorInitialLength;
let badge = 1;
let cardSet;
let extensionCards;

Page({
  data: {
    cardSet
  },
  onLoad() {
    setTimeout(() => {
      ({ openid } = getApp().globalData);
      setTimeout(() => {
        ({ myFavor, myFavorInitialLength } = getApp().globalData);
      }, 400);
    }, 400);

    wx.showLoading({ title: 'loading' });

    wx.request({
      url: 'https://lin.innenu.com/query-card.php',
      success: res => {
        cardSet = [res.data[0], res.data[1], res.data[2]];
        extensionCards = [res.data[3], res.data[4]];
        this.setData({ cardSet });

        wx.hideLoading();
      }
    });
  },

  toFavor() {
    badge = 1;

    wx.removeTabBarBadge({
      index: 2,
      success: res => {
        console.log(res);
      }
    });

    wx.navigateTo({ url: '/pages/views/favor' });
  },

  removeCard() {
    // FIXME: What are you doing here?
    cardSet[0].class = 'destroy';

    this.setData({ cardSet }, () => {
      setTimeout(() => {
        cardSet[0].class = '';
        const firstEle = cardSet.shift();
        const firstExtensionEle = extensionCards.shift();

        extensionCards.push(firstEle);
        cardSet.push(firstExtensionEle);

        this.setData({ cardSet });
      }, 550);
    });
  },

  addToFavor() {
    /*
     * wx.request({
     *   url: 'https://lin.innenu.com/query-remark.php',
     * })
     */
    let isDuplicated = false;
    const {
      obj_id,
      category = 'card',
      name,
      locate,
      restaurant,
      src
    } = cardSet[0];

    for (let i = 0; i < myFavor.length; i++)
      if (category === myFavor[i].category && obj_id === myFavor[i].obj_id) {
        isDuplicated = true;
        wx.showToast({
          title: '它已经在收藏夹里啦',
          duration: 1000
        });
        this.removeCard();
      }

    if (isDuplicated === false) {
      myFavor.push({
        obj_id,
        category,
        name,
        locate,
        restaurant,
        src
      });

      console.log(openid);
      wx.setTabBarBadge({
        index: 2,
        text: String(badge)
      });
      badge += 1;
      wx.request({
        url: 'https://lin.innenu.com/addToFavor.php',
        data: {
          openid,
          obj_id,
          category,
          name,
          locate,
          restaurant,
          src
        },
        success: res => {
          console.log(res.data);
        }
      });
      cardSet[0].class = 'shrink';

      // FIXME: What are you doing here?
      this.setData({ cardSet }, () => {
        setTimeout(() => {
          cardSet[0].class = '';

          const firstEle = cardSet.shift();
          const firstExtensionEle = extensionCards.shift();

          extensionCards.push(firstEle);
          cardSet.push(firstExtensionEle);

          this.setData({ cardSet });
        }, 550);
      });
    }
  },

  addClass() {
    wx.setTabBarBadge({
      index: 2,
      text: String(badge)
    });
    badge += 1;

    cardSet[0].class = 'shrink';

    // FIXME: What are you doing here? Why are you using setTimeout?
    this.setData({ cardSet }, () => {
      setTimeout(() => {
        cardSet[0].class = '';

        const firstEle = cardSet.shift();
        const firstExtensionEle = extensionCards.shift();

        extensionCards.push(firstEle);
        cardSet.push(firstExtensionEle);

        this.setData({ cardSet });
      }, 0);
    });
  }
});
