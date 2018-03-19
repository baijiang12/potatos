// pages/tools/tools-game-today/tools-game-today.js
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

  onGameDetailTap:function(event){
    console.log(event.currentTarget.dataset.gameId);
    wx.navigateTo({
      url: "tools-game-today-detail/tools-game-today-detail",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})