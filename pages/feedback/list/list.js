// pages/feedback/list/list.js
import { random } from '../../../utils/common'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
    loginUser: {},
    first: '',
    more: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log('on show list')
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
    this.pageInit()
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
    this.setData({
      first: random(16),
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      more: random(16),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 初始化页面
   */
  pageInit() {
    this.setData({
      loginUser: wx.getStorageSync('loginUser'),
    })
  },

  /**
   * 反馈发布
   */
  showFeedbackCreate() {
    wx.navigateTo({
      url: '/pages/feedback/create/create',
    })
  },
})
