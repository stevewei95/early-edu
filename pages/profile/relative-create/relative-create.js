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
    relativeId: null,
    studentId: null,
    loginPhone: null,
    relativeInfoParam: {},
    permissionIndex: null,
    permissions: ['只读权限', '管理员'],
    relationIndex: null,
    relations: [
      {
        id: 1,
        name: '妈妈',
      },
      {
        id: 2,
        name: '爸爸',
      },
      {
        id: 3,
        name: '奶奶',
      },
      {
        id: 4,
        name: '爷爷',
      },
      {
        id: 5,
        name: '姥姥',
      },
      {
        id: 6,
        name: '姥爷',
      },
    ],
    showPhoneModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      relativeId: options.relativeId,
      studentId: options.studentId,
      // 'relativeInfoParam.relativeId': options.relativeId,
      'relativeInfoParam.studentId': options.studentId,
    })
  },

  relationChange(e) {
    const index = Number.parseInt(e.detail.value, 10)
    this.setData({
      relationIndex: index,
      'relativeInfoParam.relationType': this.data.relations[index].id,
    })
    console.log(this.data.relativeInfoParam)
  },

  permissionChange(e) {
    const index = Number.parseInt(e.detail.value, 10)
    this.setData({
      permissionIndex: index,
      'relativeInfoParam.adminTag': index,
    })
    console.log(this.data.relativeInfoParam)
  },

  showPhoneModal() {
    this.setData({
      showPhoneModal: true,
      loginPhone: this.data.relativeInfoParam.loginPhone || null,
    })
  },

  hidePhoneModal() {
    this.setData({
      showPhoneModal: false,
      loginPhone: null,
    })
  },

  savePhone() {
    this.setData({
      showPhoneModal: false,
      'relativeInfoParam.loginPhone': this.data.loginPhone,
    })
  },

  phoneInput(e) {
    this.setData({
      loginPhone: e.detail.value,
    })
  },

  onSave() {
    const { loginPhone, relationType, adminTag } = this.data.relativeInfoParam
    if (!loginPhone) {
      wx.showToast({
        title: '请输入登录手机',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (!relationType) {
      wx.showToast({
        title: '请选择孩子关系',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    if (adminTag === undefined || adminTag === null) {
      wx.showToast({
        title: '请选择管理权限',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    studentModel.bindRelation(this.data.relativeInfoParam).then((res) => {
      const { code, message } = res
      if (code === 200) {
        wx.navigateBack({ delta: 1 })
        wx.showToast({
          title: '保存成功',
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
