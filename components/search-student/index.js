import StudentModel from '../../models/student'
import paginationBev from '../behaviors/pagination'

const studentModel = new StudentModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  options: {
    addGlobalClass: true,
  },
  properties: {
    more: {
      type: String,
      observer: 'loadMore',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    q: '',
  },

  attached() {
    this.loadPage()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadPage() {
      studentModel.searchByName({
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize,
        name: this.data.q || '',
      })
        .then((res) => {
          const {
            data, totalCount, currentPage, pageSize,
          } = res.data
          this.setMoreData(data)
          this.setTotal(totalCount)
          this.setCurrentPage(currentPage)
          this.setPageSize(pageSize)
        })
    },
    loadMore() {
      console.log('loadMore invoked')
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.lock()
        studentModel.searchByName({
          currentPage: this.getCurrentPage(),
          pageSize: this.getPageSize(),
          name: this.data.q || '',
        })
          .then((res) => {
            this.setMoreData(res.data)
            this.unlock()
          }, () => {
            this.unlock()
          })
      }
    },

    onCancel() {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },
    onSelect(e) {
      const { student } = e.currentTarget.dataset
      this.initialize()
      this.triggerEvent('select', student, {})
    },
    onConfirm(event) {
      this.setData({
        q: event.detail.value || event.detail.text,
        dataArray: [],
      })
      this.loadPage()
    },
    onDelete() {
      this.initialize()
      this.setData({
        q: '',
      })
      console.log('qqq:', this.data.q)
    },
  },
})
