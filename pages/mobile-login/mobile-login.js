// pages/mobile-login/mobile-login.js
import LoginModel from '../../models/login'

const loginModel = new LoginModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 手机号&验证码登录
    loginType: 2,
    mobile: null,
    verifyCode: null,
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
   * 获取验证码
   */
  onVerifyCode() {
    loginModel.verifyCode(this.data.mobile)
      .then((res) => {
        console.log(res)
      })
  },

  /**
   * 手机登录
   */
  onMobileLogin() {
    const sessionKey = wx.getStorageSync('sessionKey')
    loginModel.login(this.data.loginType, this.data.mobile, sessionKey, this.data.verifyCode)
      .then((res) => {
        const { code, data, message } = res
        const firstStudent = data.students ? data.students[0] : null
        if (code === 200) {
          console.log(data)
          wx.setStorageSync('loginUser', data)
          wx.setStorageSync('mobile', this.data.mobile)
          wx.setStorageSync('currentStudent', firstStudent ? firstStudent.id : null)
          wx.navigateBack({ delta: 2 })
        } else {
          wx.showToast({
            title: message,
            icon: 'none',
            duration: 2000,
          })
        }
      })
  },

  bindMobileInput(e) {
    this.setData({
      mobile: e.detail.value,
    })
  },

  bindVerifyCodeInput(e) {
    this.setData({
      verifyCode: e.detail.value,
    })
  },
})
