// pages/news/news-detail/news-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 20,
    focus: false,
    showModal: false,
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521534040161&di=89294943dd6b8df81c3331f344194f52&imgtype=0&src=http%3A%2F%2Fbpic.ooopic.com%2F15%2F64%2F23%2F15642315-8423be90a53c3b3b4f44c44db84359a2-2.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521473355301&di=6dc5dceaae35bb9485a586a0e2751711&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f402565e5b5032f875ae3401ed18.png',
      'http://image.wufazhuce.com/Fv7sIjdPR0CceEDIZ4wd62jWAhTU',
      'http://image.wufazhuce.com/FstbIkUvTiKbCRpGoeqvk_fQKgio',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522067917&di=9b5ee7480672766eddd3fb56bf7fc270&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b221565e5b516ac7255d2e98bbcb.jpg%401280w_1l_2o_100sh.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521473246831&di=fb8ed098328bb4b928321e2999cbc74e&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F78%2F80%2F95c58PICn2f_1024.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521474064312&di=a8ed7acf04007c4675e46219d943aa10&imgtype=0&src=http%3A%2F%2Feasyread.ph.126.net%2FpGkEQU81Eyc0_7NJk_Z1pQ%3D%3D%2F7916704721824964137.jpg'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },

  mytouchstart:function(){
    this.setData({
      showModal: false
    })
  },

  go: function () {
    this.setData({
      showModal: false
    })
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
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