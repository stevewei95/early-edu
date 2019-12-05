import HTTP from '../utils/http-p'

class KeywordModel extends HTTP {
  constructor() {
    super()
    this.key = 'q'
    this.maxLength = 10
  }

  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword',
    })
  }

  addToHistory(keyword) {
    const words = this.getHistory()
    if (!words.includes(keyword)) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export default KeywordModel
