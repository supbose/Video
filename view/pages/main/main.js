const { remote, ipcRenderer } = require('electron')
const Page = require('../../../src/page')
const main = document.querySelector('main')

let page = new Page(main)
//获取当前窗口
const win = remote.getCurrentWindow()
//控制按钮组
const controls = document.getElementsByClassName('controls')[0].children
const bot_btns = document.querySelector('footer').getElementsByTagName('li')
const popups = document.getElementById('popups')
//记录主进程运行的推送
let mainPush = {
  hot: null,
  hot_search: null
}
let windowOptions = {
  //_max:记录窗口最大化
  _max: false,
  _current: bot_btns[0],
  title: "具映",
  /**
   * @param {HTMLLIElement} value
   */
  set current(value) {
    this._current.classList.remove('current')
    this._current = value
    this._current.classList.add('current')
  },
  get current() {
    return this._current
  },
  get max() {
    this._max = !this._max
    return !this._max
  }
}


//------------------事件
//主进程推送总榜单事件,只会触发一次
ipcRenderer.once('hot', (e, arg) => {
  mainPush.hot = JSON.parse(arg).data
})
//主进程推送热搜榜事件,只会触发一次
ipcRenderer.once('hot_search', (e, arg) => {
  mainPush.hot_search = JSON.parse(arg).hot_query[0].hot_query_info

})
//最小化单击事件
controls[0].addEventListener('click', () => {

  win.minimize()
})

//最大化|还原单击事件
controls[1].addEventListener('click', () => {
  //透明窗口调用函数最大化后isMaximized()无法正确返回.
  //如果最大化为真(双击拖拽区域最大化),则调用restore
  if (win.isMaximized()) {
    win.restore()
    win._max = false
  } else {
    if (windowOptions.max) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  }
})

//关闭单击事件
controls[2].addEventListener('click', () => {
  win.close()
})
//底栏选项
bot_btns[0].addEventListener('click', e => {
  page.toggle('home')
  windowOptions.current = bot_btns[0]
})
bot_btns[1].addEventListener('click', e => {
  page.toggle('like')
  windowOptions.current = bot_btns[1]
})
bot_btns[2].addEventListener('click', e => {
  page.toggle('set')
  windowOptions.current = bot_btns[2]
})
//popups
popups.show = function () {
  this.style.height = `${main.clientHeight - 10}px`
}
popups.hide = function () {
  this.style.height = `0px`
}
popups.loadingDom = popups.querySelector('#loading')

popups.loading = function (show = true) {
  //载入中提示...
  
}
popups.hideDom = popups.querySelector('#popups_hide')
popups.hideDom.addEventListener('click', e => {
  popups.hide()
})
popups.warpper = popups.querySelector('.popups_warpper')
ipcRenderer.on('query', (e, videos) => {
  popups.loading(false)
  console.log(videos);
})

