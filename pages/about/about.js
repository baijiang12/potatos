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

  },
  formSubmit:function(e){
    var textareaContent = e.detail.value.textarea;
    wx.request({
      url: 'http://xiaochengxu.kexie.group:8080/HeiKeOnline/feedbacks.do',
      method: 'POST',
      data: { "userId": wx.getStorageSync('userInfoId'),"current":textareaContent},
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res.data.status == 0) {
          wx.showToast({
            title: '提交失败，请重试！',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.hideToast();
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
        }
      },
      fail: function () {

      }
    });
    wx.showToast({
      icon: 'loading',
      duration: 6000
    })
  },
  onsubmit:function(e){
    //console.log(111)
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

  }
})