// pages/feedback/detail/detail.js
import FeedbackModel from '../../../models/feedback'

const feedbackModel = new FeedbackModel()

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
    CustomBar: app.globalData.CustomBar,
    loginUser: {},
    imgList: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854140634&di=ff77fedf0a986e9fd6407d168485aa58&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201502%2F11%2F20150211170401_uu2cf.jpeg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2411113224,519715616&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854267743&di=f6a81967eb7dbe5d777037de5f1efdd3&imgtype=0&src=http%3A%2F%2Fp3.ssl.cdn.btime.com%2Ft017a2d1e90c1be77db.jpg%3Fsize%3D2048x1365',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854328472&di=6f7eb27681be75b3c97b3ba4273426cd&imgtype=0&src=http%3A%2F%2Fimg3.qianzhan.com%2Fnews%2F201502%2F16%2F20150216-1e335f2bfe2102b7_600x5000.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854207821&di=5b0325a8dc9a702b35ac30479263ae98&imgtype=0&src=http%3A%2F%2Fszb.gdzjdaily.com.cn%2Fzjwb%2Fres%2F1%2F20170608%2F15631496885489564.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564854300501&di=ee3eb4130f5ccd9036e128dbda390644&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201512%2F02%2F20151202142647_23vhs.thumb.700_0.jpeg',
    ],
    showModal: false,
    showCommentEditModal: false,
    feedbackId: null,
    feedbackContent: null,
    feedback: {},
    commentList: [],
    commentParam: {},
  },

  getFeedback() {
    feedbackModel.getById(this.data.feedbackId)
      .then((res) => {
        console.log(res)
        const { code, data } = res
        if (code === 200) {
          this.setData({
            feedback: data,
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      feedbackId: options.id,
      loginUser: wx.getStorageSync('loginUser'),
    })
    this.getFeedback()
    this.getCommentList()
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

  getCommentList() {
    feedbackModel.getCommentList({
      currentPage: 1,
      pageSize: 100,
      feedbackId: this.data.feedbackId,
    }).then((res) => {
      console.log(res)
      const { code, data } = res
      if (code === 200) {
        console.log(data)
        this.setData({
          commentList: data.data,
        })
      }
    })
  },

  saveFeedbackContent() {
    feedbackModel.addComment({
      feedbackId: this.data.feedbackId,
      content: this.data.feedbackContent,
    }).then((res) => {
      console.log(res)
      const { code, message } = res
      if (code === 200) {
        this.getCommentList()
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000,
        })
        this.hideModal()
      } else {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000,
        })
      }
    })
  },

  showModal() {
    this.setData({
      showModal: true,
    })
  },

  hideModal() {
    this.setData({
      showModal: false,
      feedbackContent: null,
    })
  },

  showCommentEditModal() {
    this.setData({
      showCommentEditModal: true,
    })
  },

  hideCommentEditModal() {
    this.setData({
      showCommentEditModal: false,
      commentParam: {},
    })
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.feedback.resourceUrlList,
      current: e.currentTarget.dataset.url,
    })
  },

  textareaAInput(e) {
    this.setData({
      feedbackContent: e.detail.value,
    })
  },

  commentContentInput(e) {
    this.setData({
      'commentParam.content': e.detail.value,
    })
  },

  editComment(e) {
    const { comment } = e.currentTarget.dataset
    this.setData({
      'commentParam.id': comment.id,
      'commentParam.feedbackId': comment.feedbackId,
      'commentParam.content': comment.content,
    })
    this.showCommentEditModal()
  },

  saveComnentContent() {
    console.log(this.data.commentParam)
    feedbackModel.modifyComment(this.data.commentParam)
      .then((res) => {
        const { code, message } = res
        if (code === 200) {
          this.getCommentList()
          this.hideCommentEditModal()
          wx.showToast({
            title: '修改评论成功',
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
                wx.redirectTo({
                  url: '/pages/feedback/list/list',
                })
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

  deleteComment(e) {
    const { id } = e.currentTarget.dataset
    console.log(id)
    wx.showModal({
      title: '删除评论',
      content: '确定要删除该评论吗？',
      cancelText: '再想想',
      confirmText: '确定删除',
      success: (res) => {
        if (res.confirm) {
          feedbackModel.deleteCommentById(id)
            .then((res1) => {
              const { code, message } = res1
              if (code === 200) {
                this.getCommentList()
                wx.showToast({
                  title: '删除评论成功',
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
