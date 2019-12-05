// pages/login/login.js
import LoginModel from '../../models/login'

const loginModel = new LoginModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 微信手机号登录
    loginType: 1,
    mobile: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.userLogin()
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
   * 微信用户登录
   */
  userLogin() {
    wx.login({
      success(login) {
        if (login.code) {
          loginModel.auth(login.code)
            .then((res) => {
              wx.setStorageSync('sessionKey', res.data)
            })
        }
      },
    })
  },

  /**
   * 获取手机号
   */
  getPhoneNumber(e) {
    const { errMsg, iv, encryptedData } = e.detail
    console.log(errMsg)
    console.log(iv)
    console.log(encryptedData)
    if (errMsg === 'getPhoneNumber:ok') {
      const sessionKey = wx.getStorageSync('sessionKey')
      loginModel.getPhone(encryptedData, iv, sessionKey)
        .then((res) => {
          console.log(res)
          const { code, data, message } = res
          if (code === 200) {
            this.setData({
              mobile: data,
            })
          } else {
            wx.showToast({
              title: message,
              icon: 'none',
              duration: 2000,
            })
          }
        }).then(() => {
          loginModel.login(this.data.loginType, this.data.mobile, sessionKey)
            .then((res) => {
              console.log(res)
              const { code, data, message } = res
              const firstStudent = data.students ? data.students[0] : null
              if (code === 200) {
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
        })
    }
  },

  toMobileLogin() {
    wx.navigateTo({
      url: '/pages/mobile-login/mobile-login',
    })
  },
})
