import HTTP from '../utils/http'

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        const key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      },
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    // 到缓存中查找 or API 写到缓存中
    // KEY 确定缓存KEY
    const key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    const classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        },
      })
    } else {
      sCallback(classic)
    }
  }

  isFirst(index) {
    return index === 1
  }

  isLatest(index) {
    const latestIndex = this._getLatestIndex()
    return latestIndex === index
  }

  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success,
    }
    this.request(params)
  }

  _setLatestIndex(index) {
    // 同步写入缓存
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }

  // 生成缓存KEY
  _getKey(index) {
    const key = `classic-${index}`
    return key
  }
}

export default ClassicModel
