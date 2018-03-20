// pages/tools/tools-game-today/tools-game-today-detail/tools-game-today-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      theTab:'left'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  switchTab:function(event){
    if(event.currentTarget.dataset.lor != this.data.theTab){
      if (this.data.theTab == 'left'){
        this.setData({
          theTab: 'right'
        })
      }else{
        this.setData({
          theTab: 'left'
        })
      }
    }
    console.log(this.data.theTab);
  }
})