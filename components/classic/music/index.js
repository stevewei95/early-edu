import classicBeh from '../classic-beh'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
    },
    title: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   * 播放音乐API两种 老版和新版 项目中使用新版
   */
  data: {
    playing: false,
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png',
  },

  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },
    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        })
        return
      }
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true,
        })
      }
    },
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    },
  },
})
