// pages/profile/edit/edit.js
import config from '../../../config'
import TeacherModel from '../../../models/teacher'
import StudentModel from '../../../models/student'

const teacherModel = new TeacherModel()
const studentModel = new StudentModel()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
    CustomBar: app.globalData.CustomBar,
    // avatar: null,
    // name: null,
    // enName: null,
    // introduction: null,
    // sex: 1,
    userInfoParam: {},
    userInfo: {},
    wxUserInfo: {},
    loginUser: {},
    showNameModal: false,
    showEnameModal: false,
    showIntroModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      wxUserInfo: wx.getStorageSync('wxUserInfo'),
      loginUser: wx.getStorageSync('loginUser'),
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
            data.avatarUrl = data.avatarUrl || this.data.wxUserInfo.avatarUrl
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
            data.avatarUrl = data.avatarUrl || this.data.wxUserInfo.avatarUrl
            this.setData({
              userInfo: data,
            })
          }
        })
    }
  },

  uploadImages(path) {
    const { loginUser } = this.data
    wx.uploadFile({
      url: `${config.api_base_url}wechat/image/upload`,
      filePath: path,
      name: 'file',
      formData: {
        type: loginUser.userType,
      },
      header: {
        pin: loginUser ? loginUser.pin : null,
        tag: loginUser ? loginUser.tag : null,
      },
      success: (res) => {
        this.copyUserInfoParam()
        this.setData({
          'userInfoParam.avatarUrl': JSON.parse(res.data).data,
        })

        const { userType } = this.data.loginUser
        if (userType === 1) {
          this.modifyTeacher()
        }
        if (userType === 3) {
          this.modifyRelative()
        }
      },
    })
  },

  onChangeAvatar() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        this.uploadImages(res.tempFilePaths[0])
      },
    })
  },

  modifyInfo() {
    const { name, ename, introduction } = this.data.userInfoParam
    const { userType } = this.data.loginUser
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!ename && userType === 1) {
      wx.showToast({
        title: '请输入英文',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!introduction) {
      wx.showToast({
        title: '请输入介绍',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (introduction.length < 10) {
      wx.showToast({
        title: '介绍至少输入10个字符',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (userType === 1) {
      this.modifyTeacher()
    }
    if (userType === 3) {
      this.modifyRelative()
    }
  },

  modifyTeacher() {
    teacherModel.modify(this.data.userInfoParam).then((res) => {
      const { code, message } = res
      if (code === 200) {
        this.getUserInfo()
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
        })
      } else {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
        })
      }
    })
    this.initUserInfoParam()
  },

  modifyRelative() {
    studentModel.modifyRelative(this.data.userInfoParam).then((res) => {
      const { code, message } = res
      if (code === 200) {
        this.getUserInfo()
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,
        })
      } else {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
        })
      }
    })
    this.initUserInfoParam()
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

  copyUserInfoParam() {
    this.setData({
      userInfoParam: JSON.parse(JSON.stringify(this.data.userInfo)),
    })
  },

  initUserInfoParam() {
    this.setData({
      userInfoParam: {},
      showNameModal: false,
      showEnameModal: false,
      showIntroModal: false,
    })
  },

  showNameModal() {
    this.setData({
      showNameModal: true,
    })
    this.copyUserInfoParam()
  },

  hideNameModal() {
    this.setData({
      showNameModal: false,
    })
    this.initUserInfoParam()
  },

  nameInput(e) {
    this.setData({
      'userInfoParam.name': e.detail.value,
    })
  },

  showEnameModal() {
    this.setData({
      showEnameModal: true,
    })
    this.copyUserInfoParam()
  },

  hideEnameModal() {
    this.setData({
      showEnameModal: false,
    })
    this.initUserInfoParam()
  },

  enameInput(e) {
    this.setData({
      'userInfoParam.ename': e.detail.value,
    })
  },

  showIntroModal() {
    this.setData({
      showIntroModal: true,
    })
    this.copyUserInfoParam()
  },

  hideIntroModal() {
    this.setData({
      showIntroModal: false,
    })
    this.initUserInfoParam()
  },

  introInput(e) {
    this.setData({
      'userInfoParam.introduction': e.detail.value,
    })
  },
})
