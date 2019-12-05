// pages/me/me.js
import { checkLogin } from '../../utils/util'
import TeacherModel from '../../models/teacher'
import StudentModel from '../../models/student'

const teacherModel = new TeacherModel()
const studentModel = new StudentModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginUser: {},
    wxUserInfo: {},
    mobile: '',
    userInfo: {},
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
    // 验证登录态
    checkLogin()
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
   * 初始化页面
   */
  pageInit() {
    this.setData({
      loginUser: wx.getStorageSync('loginUser'),
      wxUserInfo: wx.getStorageSync('wxUserInfo'),
      mobile: wx.getStorageSync('mobile'),
    })
    this.getUserInfo()
  },

  /**
   * 查询用户信息
   */
  getUserInfo() {
    const { userType } = this.data.loginUser
    if (userType === 1) {
      console.log('获取教师信息')
      teacherModel.get()
        .then((res) => {
          console.log(res)
          const { code, data } = res
          if (code === 200) {
            this.setData({
              userInfo: data,
            })
          }
        })
    }
    if (userType === 3) {
      console.log('获取家长信息')
      studentModel.relative()
        .then((res) => {
          console.log(res)
          const { code, data } = res
          if (code === 200) {
            this.setData({
              userInfo: data,
            })
          }
        })
    }
  },

  /**
   * 个人信息编辑
   */
  showUserEdit() {
    wx.navigateTo({
      url: '/pages/profile/edit/edit',
    })
  },

  showStudents() {
    wx.navigateTo({
      url: '/pages/profile/student-list/student-list',
    })
  },

  showSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  },

  showAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
})
