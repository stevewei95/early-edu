import HTTP from '../utils/http'

class LikeModel extends HTTP {
  like(behavoir, artID, category) {
    const url = behavoir === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category,
      },
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: sCallback,
    })
  }
}

export default LikeModel
