// components/feedbacks/index.js
import paginationBev from '../behaviors/pagination'
import FeedbackModel from '../../models/feedback'

const feedbackModel = new FeedbackModel()

Component({
  behaviors: [paginationBev],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    first: {
      type: String,
      observer: 'loadPage',
    },
    more: {
      type: String,
      observer: 'loadMore',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    loginUser: {},
    currentStudent: null,
  },

  attached() {
    this.setData({
      loginUser: wx.getStorageSync('loginUser'),
      currentStudent: wx.getStorageSync('currentStudent'),
    })
    this.loadPage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadPage() {
      const { userType } = this.data.loginUser
      if (userType === 1) {
        console.log('获取教师反馈列表')
        feedbackModel.getTeacherList({
          currentPage: this.data.currentPage,
          pageSize: this.data.pageSize,
        })
          .then((res) => {
            const {
              data, totalCount, currentPage, pageSize,
            } = res.data
            this.setMoreData(data)
            this.setTotal(totalCount)
            this.setCurrentPage(currentPage)
            this.setPageSize(pageSize)
            wx.stopPullDownRefresh()
          })
      }
      if (userType === 3) {
        console.log('获取学生反馈列表')
        feedbackModel.getStudentList({
          currentPage: this.data.currentPage,
          pageSize: this.data.pageSize,
          studentId: this.data.currentStudent,
        })
          .then((res) => {
            const {
              data, totalCount, currentPage, pageSize,
            } = res.data
            this.setMoreData(data)
            this.setTotal(totalCount)
            this.setCurrentPage(currentPage)
            this.setPageSize(pageSize)
            wx.stopPullDownRefresh()
          })
      }
    },
    loadMore() {
      console.log('loadMore invoked')
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.lock()
        const { userType } = this.data.loginUser
        if (userType === 1) {
          console.log('获取教师反馈列表')
          feedbackModel.getTeacherList({
            currentPage: this.getCurrentPage(),
            pageSize: this.getPageSize(),
          })
            .then((res) => {
              this.setMoreData(res.data)
              this.unlock()
            }, () => {
              this.unlock()
            })
        }
        if (userType === 3) {
          console.log('获取学生反馈列表')
          feedbackModel.getStudentList({
            currentPage: this.getCurrentPage(),
            pageSize: this.getPageSize(),
            studentId: this.data.currentStudent,
          })
            .then((res) => {
              this.setMoreData(res.data)
              this.unlock()
            }, () => {
              this.unlock()
            })
        }
      }
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
                  this.initialize()
                  this.loadPage()
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
  },
})
