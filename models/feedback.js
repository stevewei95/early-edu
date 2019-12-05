import HTTP from '../utils/http-p'

class FeedbackModel extends HTTP {
  getById(id) {
    return this.request({
      url: `wechat/course/feedback/${id}`,
    })
  }

  add(record) {
    return this.request({
      url: 'wechat/course/feedback/add',
      method: 'POST',
      data: record,
    })
  }

  deleteById(id) {
    return this.request({
      url: `wechat/course/feedback/del/${id}`,
      method: 'POST',
    })
  }

  modify(feedback) {
    return this.request({
      url: 'wechat/course/feedback/modify',
      method: 'POST',
      data: feedback,
    })
  }

  getStudentLatest(studentId) {
    return this.request({
      url: `wechat/course/feedback/student/latest/list/${studentId}`,
    })
  }

  getStudentList(obj) {
    return this.request({
      url: 'wechat/course/feedback/student/list',
      data: obj,
    })
  }

  getTeacherLatest() {
    return this.request({
      url: 'wechat/course/feedback/teacher/latest/list',
    })
  }

  getTeacherList(obj) {
    return this.request({
      url: 'wechat/course/feedback/teacher/list',
      data: obj,
    })
  }

  addComment(comment) {
    return this.request({
      url: 'wechat/course/feedback/content/add',
      method: 'POST',
      data: comment,
    })
  }

  deleteCommentById(id) {
    return this.request({
      url: `wechat/course/feedback/content/del/${id}`,
      method: 'POST',
    })
  }

  modifyComment(comment) {
    return this.request({
      url: 'wechat/course/feedback/content/modify',
      method: 'POST',
      data: comment,
    })
  }

  getCommentList(obj) {
    return this.request({
      url: 'wechat/course/feedback/content/list',
      data: obj,
    })
  }
}

export default FeedbackModel
