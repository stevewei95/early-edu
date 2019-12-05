import HTTP from '../utils/http-p'

class TeacherModel extends HTTP {
  get() {
    return this.request({
      url: 'wechat/teacher',
    })
  }

  getById(id) {
    return this.request({
      url: `wechat/teacher/${id}`,
    })
  }

  modify(teacher) {
    return this.request({
      url: 'wechat/teacher/modify',
      method: 'POST',
      data: teacher,
    })
  }
}

export default TeacherModel
