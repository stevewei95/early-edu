import HTTP from '../utils/http-p'

class LoginModel extends HTTP {
  auth(code) {
    return this.request({
      url: `wechat/auth/${code}`,
    })
  }

  login(loginType, mobile, sessionKey, verifyCode) {
    return this.request({
      url: 'wechat/login',
      method: 'POST',
      data: {
        loginType,
        mobile,
        sessionKey,
        verifyCode,
      },
    })
  }

  verifyCode(mobile) {
    return this.request({
      url: `wechat/verifyCode/${mobile}`,
      method: 'POST',
    })
  }

  getPhone(encryptedData, iv, sessionKey) {
    return this.request({
      url: 'wechat/phone',
      data: {
        encryptedData,
        iv,
        sessionKey,
      },
    })
  }
}

export default LoginModel
