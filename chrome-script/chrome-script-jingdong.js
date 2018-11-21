// ==UserScript==
// @name         doubleEleven-jingdong
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       rossroma
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @include      https://sz.jd.com/indexs.html
// @run-at       document-end
// @match        <$URL$>
// ==/UserScript==

// 监听价格变动
var handleSaleChange = (function () {
  var changeNum = 0
  return {
    init() {
      console.log('查询销售额')
      
      $.get('https://sz.jd.com/realtime/getRealtimeData.ajax', (data, status) => {
        var result = JSON.parse(data)
        var newSale = result.content.OrdAmt.summary.value
        var uv = result.content.UV.value
        if (changeNum !== newSale + uv) {
          handleSaleChange.emitData(newSale, uv)
          changeNum = newSale + uv
        }
        setTimeout(handleSaleChange.init, 10000)
      })
    },
    emitData(newSale, uv) {
      console.log('价格变更:', `当前销售额：${newSale}`, `访客数：${uv}`)
      const storeName = $('.shop-name a').text().trim()
      const img = new Image()
      img.src = `http://192.168.40.135/pageData/jingdong?store=${storeName}&sale=${newSale}&uv=${uv}`
    }
  }
})()
setTimeout(() => {
  // 开始执行方法
  handleSaleChange.init()
}, 7000)

setTimeout(() => {
  // 每小时刷新一次页面，防止token过期
  window.location.reload()
}, 3600)
