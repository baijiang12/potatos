// pages/news/news.js
import { News } from 'news-model.js';
var news = new News();
var newsData = require('../../data/news-data.js');
var time = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    hidden: true,
    title: '- 下拉加载更多资讯 -'
  },

  onBindFocus: function () {

  },
  onBindChange: function (options) {

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this._loadData(options.id);
  },

  _loadData: function (id) {
    var that = this;
    var start = [];
    var limit = 2;
    news.getNewsData(id,(res) => {
      var now = new Date().getTime();
      for (var i = 0; i < res.length; i++) {
        var oldtime = res[i].time;
        var mess = time.getDateDiff(oldtime);
        //转换oldtime
        res[i].time = "";
        start[i] = mess;
        res[i].time = start[i];
      }
      that.setData({
        newsArr: res,
      })
      //数据绑定
      that.setData({
        lunbotu: newsData.lunbotu
      })
    });
    limit++;
    that.data.limit = limit;
  },

  onNewsDetail: function (event) {
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: 'news-detail/news-detail?id='+ newsId,
    })

  },
  /**
   * 
   * 生命周期函数--监听页面初次渲染完
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
    wx.showNavigationBarLoading();
    wx.request({
      url: 'http://47.95.4.127:8080/HeiKeOnline/news/list.do',
      data: { offset: 0, limit: 2 },
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
      },
      fail: function (error) {
        console.log(error);
      }
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var start = [];
    var that = this;
    var limit = that.data.limit;
    wx.request({
      url: 'http://47.95.4.127:8080/HeiKeOnline/news/list.do',
      data: { offset: 0, limit: limit },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          hidden: false
        })
        var now = new Date().getTime();
        for (var i = 0; i < res.data.length; i++) {
          var oldtime = res.data[i].time;
          var mess = time.getDateDiff(oldtime);
          res.data[i].time = "";
          start[i] = mess;
          res.data[i].time = start[i];
        }
        that.setData({
          newsArr: res.data
        })
        if (limit > res.data.length) {
          setTimeout(function () {
            that.setData({
              hide: false,
              title: '已经到底'
            })
          }, 500)
        }if(limit>res.data.length){
          limit = res.data.length;
        }else{
          limit++;
          that.data.limit = limit;
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})