// pages/tools/tools-game-today/tools-game-today.js
import { Config } from '../../../utils/config.js';
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

    // 赛事关注缓存
    var that = this;
    that.setData({
      matchId: options.matchId
    })
    // 设置更新比赛数目的缓存
    wx.removeStorageSync('refresh_game')
    wx.setStorageSync('refresh_game', 0);
    var gamefollow = wx.getStorageSync('game_follow');
    // 判断是否有赛事关注缓存
    if (gamefollow) {
      if (gamefollow[options.matchId] != null) {
        that.setData({
          gamefollow
        })
      } else {
        gamefollow[options.matchId] = false;
        that.setData({
          gamefollow
        })
        wx.setStorageSync('game_follow', gamefollow);
      }
    } else {
      var gamefollow = {};
      gamefollow[options.matchId] = false;
      that.setData({
        gamefollow
      })
      wx.setStorageSync('game_follow', gamefollow);
    }
    // 获取比赛
    wx.request({
      url: Config.restUrl + 'games/list/future.do',
      method: 'POST',
      data: {
        offset: 0,
        limit: 10,
        direction: '>'
      },
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        that.setData({
          todayGame: res.data
        })
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
      url: Config.restUrl + 'games/list/ago.do',
      method: 'POST',
      data: {
        offset: wx.getStorageSync('refresh_game'),
        limit: 5,
        direction: '<'
      },
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        wx.setStorageSync('refresh_game', wx.getStorageSync('refresh_game') + 5);
        // 将新获取到的比赛追加到前面 
        if (JSON.stringify(res.data) != '[]') {
          var temp = res.data.reverse();
          var temp = res.data;
          var former = that.data.todayGame;
          var lenformer = Object.keys(temp).length;
          for (var i = 0; i < Object.keys(former).length; i++) {
            temp[lenformer + i] = former[i];
          }
          that.setData({
            todayGame: temp
          })
        } else {
          wx.showToast({
            title: '无更多赛事',
            icon: 'none',
            duration: 2000
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
  followTap: function (res) {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已授权
          var matchId = that.data.matchId;
          var gamefollow = wx.getStorageSync('game_follow');
          gamefollow[matchId] = !gamefollow[matchId];
          that.setData({
            gamefollow
          })
          wx.setStorageSync('game_follow', gamefollow);
          if (gamefollow[matchId]) {
            wx.request({
              url: Config.restUrl + 'users/concern.do',
              data: {
                userId: wx.getStorageSync('userInfoId'),
                gameId: matchId
              },
              header: {
                "Content-type": "application/json"
              },
              method: 'POST',
              success: function (res) {
              },
              fail: function () { }

            })
          } else {
            wx.request({
              url: Config.restUrl + 'users/concern.do',
              data: {
                userId: wx.getStorageSync('userInfoId'),
                gameId: matchId
              },
              header: {
                "Content-type": "application/json"
              },
              method: 'DELETE',
              success: function (res) {
              },
              fail: function () { }

            })
          }
        } else {
          // 未授权,获取用户信息
          wx.showModal({
            title: '提示',
            content: '关注前请登录',
            showCancel: false,
            success: function (result) {
              if (result.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data) {
                      if (data.authSetting["scope.userInfo"] == true) {
                        wx.getUserInfo({
                          success: function (ress) {
                            app.globalData.userInfo = ress.userInfo;
                            // 进行关注
                            var matchId = that.data.matchId;
                            var gamefollow = wx.getStorageSync('game_follow');
                            gamefollow[matchId] = !gamefollow[matchId];
                            that.setData({
                              gamefollow
                            })
                            wx.setStorageSync('game_follow', gamefollow);
                            if (gamefollow[matchId]) {
                              wx.request({
                                url: Config.restUrl + 'users/concern.do',
                                data: {
                                  userId: wx.getStorageSync('userInfoId'),
                                  gameId: matchId
                                },
                                header: {
                                  "Content-type": "application/json"
                                },
                                method: 'POST',
                                success: function (res) {
                                },
                                fail: function () { }

                              })
                            } else {
                              wx.request({
                                url: Config.restUrl + 'users/concern.do',
                                data: {
                                  userId: wx.getStorageSync('userInfoId'),
                                  gameId: matchId
                                },
                                header: {
                                  "Content-type": "application/json"
                                },
                                method: 'DELETE',
                                success: function (res) {
                                },
                                fail: function () { }

                              })
                            }
                          }
                        })
                      }

                    }
                  },
                  fail: function () {
                    console.info("设置失败返回数据");

                  }
                });
              } else if (result.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })




  }
})