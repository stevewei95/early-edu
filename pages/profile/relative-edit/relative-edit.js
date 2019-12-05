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
    relativeInfo: {},
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
    })
    this.getRelativeById()
  },

  getRelativeById() {
    studentModel.getRelativeById(this.data.relativeId, this.data.studentId)
      .then((res) => {
        console.log(res)
        const { code, data } = res
        if (code === 200) {
          this.setData({
            relativeInfo: data,
            permissionIndex: data.adminTag,
          })
          this.data.relations.forEach((element, index) => {
            if (element.id === data.relationType) {
              this.setData({
                relationIndex: index,
              })
            }
          })
        }
      })
  },

  updateRelation() {
    const { loginPhone } = this.data.relativeInfoParam
    if (!loginPhone) {
      wx.showToast({
        title: '请输入登录手机',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    studentModel.updateRelation(this.data.relativeInfoParam).then((res) => {
      const { code, message } = res
      if (code === 200) {
        this.getRelativeById()
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
    this.initRelativeInfoParam()
  },

  relationChange(e) {
    this.copyRelativeInfoParam()
    const index = Number.parseInt(e.detail.value, 10)
    this.setData({
      relationIndex: index,
      'relativeInfoParam.relationType': this.data.relations[index].id,
    })
    console.log(this.data.relativeInfoParam)
    this.updateRelation()
  },

  permissionChange(e) {
    this.copyRelativeInfoParam()
    const index = Number.parseInt(e.detail.value, 10)
    this.setData({
      permissionIndex: index,
      'relativeInfoParam.adminTag': index,
    })
    console.log(this.data.relativeInfoParam)
    this.updateRelation()
  },

  copyRelativeInfoParam() {
    this.setData({
      'relativeInfoParam.loginPhone': this.data.relativeInfo.loginPhone,
      'relativeInfoParam.relationType': this.data.relativeInfo.relationType,
      'relativeInfoParam.adminTag': this.data.relativeInfo.adminTag,
      'relativeInfoParam.relativeId': this.data.relativeId,
      'relativeInfoParam.studentId': this.data.studentId,
    })
  },

  initRelativeInfoParam() {
    this.setData({
      relativeInfoParam: {},
      showPhoneModal: false,
    })
  },

  showPhoneModal() {
    this.setData({
      showPhoneModal: true,
    })
    this.copyRelativeInfoParam()
  },

  hidePhoneModal() {
    this.setData({
      showPhoneModal: false,
    })
    this.initRelativeInfoParam()
  },

  phoneInput(e) {
    this.setData({
      'relativeInfoParam.loginPhone': e.detail.value,
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
