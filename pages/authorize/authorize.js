// pages/authorize/authorize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const wxUserInfo = wx.getStorageSync('wxUserInfo')
    if (wxUserInfo) {
      wx.navigateBack({})
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 获取用户信息
   */
  onGetUserInfo(e) {
    if (!e.detail.userInfo) {
      return
    }
    // 存储用户基本信息
    console.log(e.detail.userInfo)
    wx.setStorageSync('wxUserInfo', e.detail.userInfo)
    // 用户授权后跳转到登录页
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
})
