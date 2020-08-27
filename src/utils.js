const debounce = require('./debounce')
let utils = {
  /**
   * @description 是否为空文本
   * @param {String} str  
   * @return {Boolean} 空文本返回true,反之
   */
  isEmptyText(str) {
    if (!str.replace(/\s*/g, "").length) {
      return true
    }
    return false
  },
  debounce
}
module.exports = utils