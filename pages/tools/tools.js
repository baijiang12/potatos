// pages/tools/tools.js
var matchList = require("../data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(matchList);
    this.setData({
      matchList: matchList
    });
  },
  sportDetail: function (event) {
    var matchStatus = event.currentTarget.dataset.status;
    if (matchStatus == 0) {
      wx.showToast({
        title: '暂无赛事',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: "tools-game-today/tools-game-today?matchId=" + event.currentTarget.dataset.sportid,
      })
    }

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

  },
  formSubimt: function (res) {
    wx.request({
      url: 'http://47.95.4.127:8080/HeiKeOnline/formvalues.do',
      data: {
        userId: wx.getStorageSync('userInfoId'),
        // formId: res.detail.formId,
        formId:1522653763724,
      },
      method: 'POST',
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        // console.log(res)
      },
      fail: function () {

      }

    })
  },
})