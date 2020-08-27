const https = require('https')
const fs = require('fs')
const api = JSON.parse(fs.readFileSync(`${__dirname}/data/api.json`))

let resource = {
  /**
   *  @description 获取爱奇艺top
   *  @param {number} type 1电影 2电视剧 4动漫 6综艺 
   * */
  pushIqyTop(type, size = 25, page = 1) {
    return new Promise((resolve, reject) => {
      const iqiyi = https.get(`https://pcw-api.iqiyi.com/album/album/fytoplist?cid=${type}&dim=hour&type=realTime&size=${size}&page=${page}`)
      iqiyi.on('response', (res) => {
        let data = ''
        res.on('data', chunk => {
          data += chunk.toString()
        })
        res.on('end', () => {
          resolve(data)
        })
        res.on('error', e => {
          reject(e.message)
        })
      })
    })
  },
  pushHotSearch() {
    return new Promise((resolve, reject) => {
      const iqiyi = https.get(`https://search.video.iqiyi.com/m?if=hotQueryNew&platform=14&children_tab=1&from=pcw_searchbox&hot_query_type=1&pagesize=5`)
      iqiyi.on('response', (res) => {
        let data = ''
        res.on('data', chunk => {
          data += chunk.toString()
        })
        res.on('end', () => {
          resolve(data)
        })
        res.on('error', e => {
          reject(e.message)
        })
      })
    })
  },
  pushBdtop() {
    return new Promise((resolve, reject) => {
      let api = 'https://v.baidu.com/videoapi/?page_name=index&format=json&block_sign=list_index_top_movie_all,index_top_tv_all,index_top_tamasha,index_top_cartoon'
      const bdTop = https.get(api)
      bdTop.on('response', res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk.toString()
        })
        res.on('end', () => {
          resolve(data)
        })
        res.on('error', e => {
          reject(e.message)
        })
      })
    })
  },
  queryName(name) {
    return api
  }
}

module.exports = resource