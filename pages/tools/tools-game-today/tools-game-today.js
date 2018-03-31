// pages/tools/tools-game-today/tools-game-today.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayGame: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://47.95.4.127:8080/HeiKeOnline/games/list.do',
      method: 'POST',
      data: {
        offset: 0,
        limit: 10,
        current: '2018-03-25',
        direction: '>'
      },
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        that.setData({
          todayGame: res.data
        })
        // console.log(that.data.todayGame)
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  // 比赛详情跳转
  onGameDetailTap: function (event) {
    wx.navigateTo({
      url: 'tools-game-today-detail/tools-game-today-detail?list=' + JSON.stringify(event.currentTarget.dataset),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    // current 应该设置一个缓存,需将天数累加
    wx.request({
      url: 'http://47.95.4.127:8080/HeiKeOnline/games/list.do',
      method:'POST',
      data: {
        offset: 0,
        limit: 10,
        current: '2018-03-29',
        direction: '<'
      },
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        // 将新获取到的比赛追加到前面 
        if(res.data){
          var temp = res.data.reverse();
          var former = that.data.todayGame;
          var lenformer = Object.keys(temp).length;
          for (var i = 0; i < Object.keys(former).length; i++) {
            temp[lenformer + i] = former[i];
          }
          that.setData({
            todayGame: temp
          })
        }else{
          wx.showToast({
            title: '无更多赛事',
            icon:none,
            duration:1000
          })
        }
      },
      fail: function (error) {
        console.log(error)
      }
    })
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
})