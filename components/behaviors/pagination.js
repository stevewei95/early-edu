const paginationBev = Behavior({
  data: {
    dataArray: [],
    currentPage: 1,
    pageSize: 10,
    total: null,
    noneResult: false,
    loading: false,
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = [...this.data.dataArray, ...dataArray]
      this.setData({
        dataArray: tempArray,
      })
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    getCurrentPage() {
      return this.data.currentPage + 1
    },
    getPageSize() {
      return this.data.pageSize
    },
    setTotal(total) {
      this.setData({
        total,
        noneResult: total === 0,
      })
    },
    setCurrentPage(currentPage) {
      this.setData({
        currentPage,
      })
    },
    setPageSize(pageSize) {
      this.setData({
        pageSize,
      })
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      }
      return true
    },
    initialize() {
      this.setData({
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false,
      })
    },
    isLocked() {
      return this.data.loading === true
    },
    lock() {
      this.setData({
        loading: true,
      })
    },
    unlock() {
      this.setData({
        loading: false,
      })
    },
  },
})
export default paginationBev
