// pages/book/book.js
import BookModel from '../../models/book'
import KeywordModel from '../../models/keyword'
import { random } from '../../utils/common'

const bookModel = new BookModel()
const keywordModel = new KeywordModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    hotWords: [],
    more: '',

    // JS 处理异步的方式
    // 1. 纯粹 callback 回调地狱 剥夺函数 return 的能力
    // 2. promise 多个异步等待合并 不需要层层传递 callback
    // 3. async await ES2017 小程序暂时不支持
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    bookModel.getHotList()
      .then((res) => {
        this.setData({
          books: res,
        })
      })

    keywordModel.getHot()
      .then((res) => {
        this.setData({
          hotWords: res.hot,
        })
      })

    // Promise 是对象，可以保存状态
    // const promise = new Promise((resolve, reject) => {
    //   // 三种状态，
    //   // 1. 进行中: pending
    //   // 2. 已成功: ulfilled
    //   // 3. 已失败: rejected
    //   wx.getSystemInfo({
    //     success: res => resolve(res),
    //     fail: error => reject(error),
    //   })
    // })

    // promise.then((res) => {
    //   console.log(res)
    // }, (error) => {
    //   console.log(error)
    // })
  },

  onSearching() {
    this.setData({
      searching: true,
    })
  },

  onCancel() {
    this.setData({
      searching: false,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.setData({
      more: random(16),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
})
