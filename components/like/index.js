Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
    readOnly: {
      type: Boolean,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
      if (this.properties.readOnly) {
        return
      }
      const {
        like,
      } = this.properties
      let {
        count,
      } = this.properties

      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like,
      })

      const behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior,
      }, {})
    },
  },
})
