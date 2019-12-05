// pages/profile/student-list/student-list.js
import StudentModel from '../../../models/student'

const studentModel = new StudentModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginUser: {},
    currentStudent: null,
    studentList: [],
    relative: {},
  },

  getStudentList() {
    studentModel.getRelativeStudents()
      .then((res) => {
        console.log(res)
        const { code, data } = res
        if (code === 200) {
          this.setData({
            studentList: data,
          })
        }
      })
  },

  getRelative() {
    studentModel.relative()
      .then((res) => {
        console.log(res)
        const { code, data } = res
        if (code === 200) {
          data.avatarUrl = data.avatarUrl || this.data.wxUserInfo.avatarUrl
          this.setData({
            relative: data,
          })
        }
      })
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
    this.setData({
      loginUser: wx.getStorageSync('loginUser'),
      currentStudent: wx.getStorageSync('currentStudent'),
    })
    this.getStudentList()
    this.getRelative()
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
   * 切换孩子
   */
  onStudentChange(e) {
    const studentId = Number.parseInt(e.detail.value, 10)
    console.log('Student ID：', studentId)
    this.setData({
      currentStudent: studentId,
    })
    wx.setStorageSync('currentStudent', studentId)
    wx.showToast({
      title: '孩子切换成功',
      icon: 'success',
      duration: 2000,
    })
  },

  /**
   * 编辑孩子信息
   */
  onStudentEdit(e) {
    const studentId = e.currentTarget.dataset.id
    console.log('Student ID：', studentId)
    wx.navigateTo({
      url: `/pages/profile/student-edit/student-edit?relativeId=${this.data.relative.id}&studentId=${studentId}`,
    })
  },
})
