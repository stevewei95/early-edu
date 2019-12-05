// pages/feedback/create/create.js
import { random } from '../../../utils/common'
import ImageModel from '../../../models/image'
import FeedbackModel from '../../../models/feedback'
import config from '../../../config'

const imageModel = new ImageModel()
const feedbackModel = new FeedbackModel()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
    loginUser: {},
    imgList: [],
    select: false,
    more: '',
    selectedStudent: null,
    subject: null,
    content: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      loginUser: wx.getStorageSync('loginUser'),
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
    this.setData({
      more: random(16),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onShowSelect() {
    this.setData({
      select: true,
    })
  },

  onCancelSelect() {
    this.setData({
      select: false,
    })
  },
  /**
   * 选择学生
   */
  onSelect(event) {
    const student = event.detail
    this.setData({
      selectedStudent: student,
      select: false,
    })
  },

  uploadImages(paths) {
    const _this = this
    const { loginUser, selectedStudent } = this.data
    const uploads = []
    paths.forEach((path, i) => {
      uploads[i] = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: `${config.api_base_url}wechat/image/upload`,
          filePath: path,
          name: 'file',
          formData: {
            id: selectedStudent.id,
            type: 4,
          },
          header: {
            pin: loginUser ? loginUser.pin : null,
            tag: loginUser ? loginUser.tag : null,
          },
          success(res) {
            resolve(res)
          },
          fail() {
            reject()
          },
        })
      })
    })
    Promise.all(uploads).then((result) => {
      _this.setData({
        imgList: _this.data.imgList.concat(result.map(item => JSON.parse(item.data).data)),
      })
    })
  },

  ChooseImage() {
    if (!this.data.selectedStudent) {
      wx.showToast({
        title: '请先选择学生',
        icon: 'none',
      })
      return
    }
    wx.chooseImage({
      count: 9 - this.data.imgList.length, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 从相册选择
      success: (res) => {
        this.uploadImages(res.tempFilePaths)
      },
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url,
    })
  },
  DelImg(e) {
    const { index } = e.currentTarget.dataset
    wx.showModal({
      title: '删除图片',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: (res) => {
        if (res.confirm) {
          imageModel.delete(this.data.imgList[index])
          this.data.imgList.splice(index, 1)
          this.setData({
            imgList: this.data.imgList,
          })
        }
      },
    })
  },
  subjectInput(e) {
    this.setData({
      subject: e.detail.value,
    })
  },
  contentInput(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  publishFeedback() {
    if (!this.data.subject) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
      })
      return
    }
    if (!this.data.content) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
      })
      return
    }
    if (this.data.content.length < 10) {
      wx.showToast({
        title: '内容最少10个字符',
        icon: 'none',
      })
      return
    }
    if (!this.data.selectedStudent) {
      wx.showToast({
        title: '请选择学生',
        icon: 'none',
      })
      return
    }
    if (this.data.imgList.length === 0) {
      wx.showToast({
        title: '请至少上传 1 张图片',
        icon: 'none',
      })
      return
    }
    feedbackModel.add({
      subject: this.data.subject,
      content: this.data.content,
      resourceUrlList: this.data.imgList,
      studentId: this.data.selectedStudent.id,
      studentName: this.data.selectedStudent.name,
    }).then((res) => {
      const { code, message } = res
      if (code === 200) {
        wx.redirectTo({
          url: '/pages/feedback/list/list',
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
})
