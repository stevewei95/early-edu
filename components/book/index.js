// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: {
      type: Object,
    },
    showLike: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      wx.navigateTo({
        url: `../../pages/book-detail/book-detail?bid=${this.properties.book.id}`,
      })
    },
  },
})
