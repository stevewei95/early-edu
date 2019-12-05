// pages/my/my.js
import BookModel from '../../models/book'
import ClassicModel from '../../models/classic'

const bookModel = new BookModel()
const classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  userAuthorized() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo,
              })
            },
          })
        }
      },
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then((res) => {
        this.setData({
          bookCount: res.count,
        })
      })
  },

  onGetUserInfo(event) {
    const { userInfo } = event.detail
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo,
      })
    }
  },

  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  getMyFavor() {
    classicModel.getMyFavor((res) => {
      this.setData({
        classics: res,
      })
    })
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
})
