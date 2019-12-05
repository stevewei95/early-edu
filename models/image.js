import HTTP from '../utils/http-p'

class ImageModel extends HTTP {
  upload(file, id, type) {
    return this.request({
      url: 'wechat/image/upload',
      method: 'POST',
      data: {
        file,
        id,
        type,
      },
    })
  }

  delete(url) {
    return this.request({
      url: 'wechat/image/delete',
      method: 'POST',
      data: {
        url,
      },
    })
  }
}

export default ImageModel
