// pages/home/home.js
import { checkLogin } from '../../utils/util'
import TeacherModel from '../../models/teacher'
import StudentModel from '../../models/student'
import FeedbackModel from '../../models/feedback'

const teacherModel = new TeacherModel()
const studentModel = new StudentModel()
const feedbackModel = new FeedbackModel()

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    loginUser: {},
    wxUserInfo: {},
    userInfo: {},
    currentStudent: null,
    studentInfo: {},
    feedbackList: [],
    imgList: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854140634&di=ff77fedf0a986e9fd6407d168485aa58&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201502%2F11%2F20150211170401_uu2cf.jpeg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2411113224,519715616&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854267743&di=f6a81967eb7dbe5d777037de5f1efdd3&imgtype=0&src=http%3A%2F%2Fp3.ssl.cdn.btime.com%2Ft017a2d1e90c1be77db.jpg%3Fsize%3D2048x1365',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854328472&di=6f7eb27681be75b3c97b3ba4273426cd&imgtype=0&src=http%3A%2F%2Fimg3.qianzhan.com%2Fnews%2F201502%2F16%2F20150216-1e335f2bfe2102b7_600x5000.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854207821&di=5b0325a8dc9a702b35ac30479263ae98&imgtype=0&src=http%3A%2F%2Fszb.gdzjdaily.com.cn%2Fzjwb%2Fres%2F1%2F20170608%2F15631496885489564.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854300501&di=ee3eb4130f5ccd9036e128dbda390644&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201512%2F02%2F20151202142647_23vhs.thumb.700_0.jpeg',
    ],
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
    this.getFeedbackLatest(() => {
      wx.stopPullDownRefresh()
    })
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
      currentStudent: wx.getStorageSync('currentStudent'),
    })
    this.getUserInfo()
    this.getFeedbackLatest()
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
      studentModel.relativeMulti()
        .then((res) => {
          console.log(res)
          const { code, data } = res
          if (code === 200) {
            this.setData({
              userInfo: data,
            })
            data.weChatStudentVoList.forEach((student) => {
              if (student.id === this.data.currentStudent) {
                this.setData({
                  studentInfo: student,
                })
              }
            })
          }
        })
    }
  },

  /**
   * 查询最近20条反馈信息
   */
  getFeedbackLatest(callback) {
    const { userType } = this.data.loginUser
    if (userType === 1) {
      console.log('老师：获取学生最新反馈')
      feedbackModel.getTeacherLatest()
        .then((res) => {
          console.log(res)
          const { code, data } = res
          if (code === 200) {
            this.setData({
              feedbackList: data,
            })
          }
          if (callback) {
            callback()
          }
        })
    }
    if (userType === 3) {
      console.log('家长：获取老师最新反馈')
      feedbackModel.getStudentLatest(this.data.currentStudent)
        .then((res) => {
          console.log(res)
          const { code, data } = res
          if (code === 200) {
            this.setData({
              feedbackList: data,
            })
          }
          if (callback) {
            callback()
          }
        })
    }
  },

  /**
   * 公告板
   */
  showNotice() {
    wx.navigateTo({
      url: '/pages/notice/notice',
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

  /**
   * 反馈列表
   */
  showFeedbackList() {
    wx.navigateTo({
      url: '/pages/feedback/list/list',
    })
  },

  /**
   * 反馈详情
   */
  showDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/feedback/detail/detail?id=${id}`,
    })
  },

  /**
   * 编辑用户信息
   */

  showUserEdit() {
    wx.navigateTo({
      url: '/pages/profile/edit/edit',
    })
  },

  /**
   * 编辑学生信息
   */
  showStudentEdit() {
    wx.navigateTo({
      url: `/pages/profile/student-edit/student-edit?studentId=${this.data.currentStudent}`,
    })
  },

  showStudentList() {
    wx.navigateTo({
      url: '/pages/profile/student-list/student-list',
    })
  },

  /**
     * 删除反馈
     */
  deleteFeedback(e) {
    const { id } = e.currentTarget.dataset
    console.log(id)
    wx.showModal({
      title: '删除反馈',
      content: '确定要删除该反馈吗？',
      cancelText: '再想想',
      confirmText: '确定删除',
      success: (res) => {
        if (res.confirm) {
          feedbackModel.deleteById(id)
            .then((res1) => {
              const { code, message } = res1
              if (code === 200) {
                this.getFeedbackLatest()
                wx.showToast({
                  title: '删除反馈成功',
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
})
