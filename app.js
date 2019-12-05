// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: () => {},
    // })
    // 获取用户信息
    wx.getSetting({
      success: (response) => {
        if (response.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      },
    })
    // 获取系统信息
    wx.getSystemInfo({
      success: (e) => {
        this.getStatusBarInfo(e)
        this.isIphoneX(e)
      },
    })
  },

  /**
   * 获取系统状态栏信息
   */
  getStatusBarInfo(e) {
    this.globalData.StatusBar = e.statusBarHeight
    const custom = wx.getMenuButtonBoundingClientRect()
    this.globalData.Custom = custom
    this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight
  },

  /**
   * 否判断iPhone X
   */
  isIphoneX(e) {
    if (e.model.indexOf('iPhone X') !== -1) {
      this.globalData.isIphoneX = true
    }
  },

  globalData: {
    userInfo: null,
    isIphoneX: false,
  },
})
