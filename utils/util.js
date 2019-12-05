const formatNumber = (n) => {
  const num = n.toString()
  return num[1] ? num : `0${num}`
}

const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const toLogin = () => {
  const wxUserInfo = wx.getStorageSync('wxUserInfo')
  if (!wxUserInfo) {
    wx.navigateTo({
      url: '/pages/authorize/authorize',
    })
  } else {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
}

const checkLogin = () => {
  const loginUser = wx.getStorageSync('loginUser')
  // 已经进行了登录，检查登录是否过期
  if (loginUser) {
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log('session_key 未过期')
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        this.clearStorage()
        toLogin()
      },
    })
  } else {
    // 没有进行登录则先进行登录操作
    toLogin()
  }
}

const clearStorage = () => {
  wx.removeStorageSync('loginUser')
  wx.removeStorageSync('mobile')
  wx.removeStorageSync('currentStudent')
  wx.removeStorageSync('sessionKey')
}

module.exports = {
  formatTime,
  checkLogin,
  clearStorage,
  toLogin,
}
