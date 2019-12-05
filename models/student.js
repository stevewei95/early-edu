import HTTP from '../utils/http-p'

class StudentModel extends HTTP {
  getById(id) {
    return this.request({
      url: `wechat/student/${id}`,
    })
  }

  searchByName(obj) {
    return this.request({
      url: 'wechat/student/search',
      data: obj,
    })
  }

  modify(student) {
    return this.request({
      url: 'wechat/student/modify',
      method: 'POST',
      data: student,
    })
  }

  relative() {
    return this.request({
      url: 'wechat/student/relative',
    })
  }

  relativeMulti() {
    return this.request({
      url: 'wechat/student/relative/multi',
    })
  }

  getRelativeStudents() {
    return this.request({
      url: 'wechat/student/relative/students',
    })
  }

  modifyRelative(relative) {
    return this.request({
      url: 'wechat/student/relative/modify',
      method: 'POST',
      data: relative,
    })
  }

  getRelativesByStudentId(studentId) {
    return this.request({
      url: `wechat/student/relative/list/${studentId}`,
    })
  }

  getRelativeById(relativeId, studentId) {
    return this.request({
      url: `wechat/student/relative/${relativeId}/${studentId}`,
    })
  }

  bindRelation(relation) {
    return this.request({
      url: 'wechat/student/relative/relation/bind',
      method: 'POST',
      data: relation,
    })
  }

  updateRelation(relation) {
    return this.request({
      url: 'wechat/student/relative/relation/update',
      method: 'POST',
      data: relation,
    })
  }

  removeRelation(relativeId, studentId) {
    return this.request({
      url: `wechat/student/relative/type/remove/${relativeId}/${studentId}`,
      method: 'POST',
    })
  }
}

export default StudentModel
