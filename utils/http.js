import config from '../config'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在',
}

class HTTP {
  request(params) {
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method || 'GET',
      data: params.data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          if (params.success) {
            params.success(res.data)
          }
        } else {
          const {
            data,
          } = res
          this._showError(data.error_code)
        }
      },
      // API 调用失败
      fail: () => {
        this._showError(1)
      },
    })
  }

  _showError(errorCode) {
    const tip = tips[errorCode || 1]
    wx.showToast({
      title: tip || tips[1],
      icon: 'none',
      duration: 2000,
    })
  }
}

export default HTTP
