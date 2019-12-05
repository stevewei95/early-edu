import config from '../config'
import { toLogin, clearStorage } from './util'

const tips = {
  1: '程序开了个小差',
}

export const promisic = (func) => {
  const closure = (params = {}) => {
    /* eslint-disable no-new */
    new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        },
      })
      func(args)
    })
  }
  return closure
}

class HTTP {
  request({
    url,
    data = {},
    method = 'GET',
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    const loginUser = wx.getStorageSync('loginUser')
    wx.request({
      url: `${config.api_base_url}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        pin: loginUser ? loginUser.pin : null,
        tag: loginUser ? loginUser.tag : null,
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else if (code.startsWith('401')) {
          clearStorage()
          toLogin()
        } else {
          reject()
          this._showError(res.data.error_code)
        }
      },
      // API 调用失败
      fail: () => {
        reject()
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
