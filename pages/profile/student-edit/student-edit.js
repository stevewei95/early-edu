import config from '../../../config'
import StudentModel from '../../../models/student'

const studentModel = new StudentModel()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
    CustomBar: app.globalData.CustomBar,
    // avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564853879421&di=edc2784c1bf984ff8fd5f9dd058a4525&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-09%2F053151793.jpg',
    // userName: '王俊凯',
    // enName: 'Andy',
    // sex: 0,
    loginUser: {},
    relativeId: null,
    studentId: null,
    userInfoParam: {},
    userInfo: {},
    showNameModal: false,
    showNicknameModal: false,
    showIntroModal: false,
    // 关联的亲属列表
    relatives: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      loginUser: wx.getStorageSync('loginUser'),
      relativeId: options.relativeId,
      studentId: options.studentId,
    })
    this.getUserInfo()
  },

  /**
   * 查询用户信息
   */
  getUserInfo() {
    studentModel.getById(this.data.studentId)
      .then((res) => {
        console.log(res)
        const { code, data } = res
        if (code === 200) {
          this.setData({
            userInfo: data,
          })
        }
      })
  },

  /**
   * 查询关联的亲属列表
   */
  getRelatives() {
    studentModel.getRelativesByStudentId(this.data.studentId)
      .then((res) => {
        console.log(res)
        const { code, data } = res
        if (code === 200) {
          this.setData({
            relatives: data,
          })
        }
      })
  },

  uploadImages(path) {
    const { loginUser, studentId } = this.data
    wx.uploadFile({
      url: `${config.api_base_url}wechat/image/upload`,
      filePath: path,
      name: 'file',
      formData: {
        id: studentId,
        type: 4,
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

        this.modifyRelative()
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

  modifyRelative() {
    const { name, nickName, introduction } = this.data.userInfoParam
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!nickName) {
      wx.showToast({
        title: '请输入昵称',
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
    studentModel.modify(this.data.userInfoParam).then((res) => {
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

  editRelative(e) {
    const relativeId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/profile/relative-edit/relative-edit?relativeId=${relativeId}&studentId=${this.data.studentId}`,
    })
  },

  createRelative() {
    wx.navigateTo({
      url: `/pages/profile/relative-create/relative-create?relativeId=${this.data.relativeId}&studentId=${this.data.studentId}`,
    })
  },

  deleteRelative(e) {
    const relativeId = e.currentTarget.dataset.id
    const { studentId } = this.data
    wx.showModal({
      title: '删除关联',
      content: '确定要删除关联吗？',
      cancelText: '再想想',
      confirmText: '确定删除',
      success: (res) => {
        if (res.confirm) {
          studentModel.removeRelation(relativeId, studentId)
            .then((res1) => {
              const { code, message } = res1
              if (code === 200) {
                this.getRelatives()
                wx.showToast({
                  title: '删除关联成功',
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
        }
      },
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
    this.getRelatives()
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
   * 保存信息
   */

  onSave() {
    wx.showToast({
      title: '保存信息成功',
      icon: 'success',
      duration: 2000,
    })
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
      showNicknameModal: false,
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

  showNicknameModal() {
    this.setData({
      showNicknameModal: true,
    })
    this.copyUserInfoParam()
  },

  hideNicknameModal() {
    this.setData({
      showNicknameModal: false,
    })
    this.initUserInfoParam()
  },

  nicknameInput(e) {
    this.setData({
      'userInfoParam.nickName': e.detail.value,
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

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX,
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left',
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection === 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target,
      })
    } else {
      this.setData({
        modalName: null,
      })
    }
    this.setData({
      ListTouchDirection: null,
    })
  },
})
